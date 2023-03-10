import {
    BadRequestException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Promise } from 'mongoose'

import { IListRequest, WhereInput } from '../../shared/common/interfaces'
import {
    COLLECTION,
    ERROR,
    NOTIFY_TYPE,
    ORDER_STATUS,
    STATUS,
} from '../../shared/constants'
import ValidateData from '../../shared/helper/validate-data'
import { NotificationService } from '../notification/notification.service'
import { ProductEntity } from '../product/entites/product.entity'
import { Product } from '../product/model/product.schema'
import { UserEntity } from '../users/entities/user.entity'
import { User } from '../users/model/user.schema'
import { FilterOrder } from './dto/filter-order'
import { OrderDto } from './dto/order.dto'
import { OrderEntity } from './entities/order.entity'
import { Order } from './model/order.schema'

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(COLLECTION.ORDER)
        private readonly OrderModel: Model<Order>,
        @InjectModel(COLLECTION.PRODUCTS)
        private readonly ProductModel: Model<Product>,
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>,
        private readonly notificationService: NotificationService
    ) {}

    async createOrder(buyerId: string, productId: string, doc: OrderDto) {
        const [product, buyer]: [Product, User] = await Promise.all([
            this.ProductModel.findById(productId),
            this.UserModel.findById(buyerId),
        ])
        ValidateData.validateDataNotFound(product)
        if (product.status !== STATUS.APPROVED) {
            throw new NotAcceptableException(ERROR.ACCESS_DENIED)
        }
        await new this.OrderModel({
            ...doc,
            buyerId: buyerId,
            sellerId: product.userId,
            newsId: productId,
        }).save()
        await Promise.all([
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.BOOKING,
                objectId: product.id,
                userId: buyerId,
                title: 'B???n ???? ?????t l???ch xem xe th??nh c??ng',
                message:
                    'N???u kh??ng ph???i l?? h??nh ?????ng c???a b???n, xin vui l??ng li??n h???',
                projectId: product.id,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: product.id,
                userId: product.userId,
                title: `B???n ???? nh???n ???????c 1 l???ch ?????t h???n xe t??? ng?????i d??ng ${buyer.userName} c?? S??? ??i???n tho???i ${buyer.phone}`,
                message: 'Vui l??ng s???p x???p th???i gian ????? giao d???ch',
                projectId: product.id,
                fromId: buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(productId, {
                status: STATUS.CONFIRMING,
            }),
        ])
    }

    async getList(args: IListRequest, options?: FilterOrder) {
        console.log(options)
        const { limit, offset } = args.pagination
        const queries = this.pickQueries(options)
        const orders: Order[] = await this.OrderModel.find(queries)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!orders) {
            throw new NotFoundException()
        }
        const productTerms: WhereInput[] = []
        const userBuyerTerm: WhereInput[] = []
        const userSellerTerm: WhereInput[] = []

        for (const order of orders) {
            productTerms.push({ id: order.newsId })
            userBuyerTerm.push({ id: order.buyerId })
            userSellerTerm.push({ id: order.sellerId })
        }

        const [total, products, buyers, sellers] = await Promise.all([
            this.OrderModel.count(queries),
            this.ProductModel.find({ productTerms }),
            this.UserModel.find({ userBuyerTerm }),
            this.UserModel.find({ userSellerTerm }),
        ])
        return {
            data: orders.map((order) => {
                const product = this.filterTypeObject(products, order.newsId)

                const buyer = this.filterTypeObject(buyers, product.buyerId)
                const seller = this.filterTypeObject(sellers, product.sellerId)

                return {
                    ...new OrderEntity(order),
                    product: new ProductEntity(product),
                    buyer: new UserEntity(buyer),
                    seller: new UserEntity(seller),
                }
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    pickQueries(options?: FilterOrder): FilterQuery<Order> {
        const queries = {}

        options?.buyerId &&
            Object.assign(queries, {
                buyerId: options.buyerId,
            })

        options?.sellerId &&
            Object.assign(queries, {
                sellerId: options.sellerId,
            })

        options?.status &&
            Object.assign(queries, {
                orderStatus: options.status,
            })
        return queries
    }

    filterTypeObject(data: any[], objectId: string) {
        if (data.length) {
            return data.find((r) => r.id === objectId)
        }
    }

    async confirmOrder(id: string, ownerId: string) {
        const order: Order = await this.OrderModel.findOneAndUpdate(
            { newsId: id, sellerId: ownerId },
            { orderStatus: ORDER_STATUS.DONE }
        )
        ValidateData.validateDataNotFound(order)
        await Promise.all([
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.BOOKING,
                objectId: order.id,
                userId: order.buyerId,
                title: 'Giao d???ch th??nh c??ng',
                message: 'B???n ???? mua xe th??nh c??ng ! Ch??c m???ng b???n',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `Xe c???a b???n ???? ???????c b??n th??nh c??ng!`,
                message: 'C???m ???n b???n ???? s??? d???ng d???ch v???',
                projectId: order.newsId,
                fromId: order.buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(order.newsId, {
                status: STATUS.DONE,
            }),
        ])
    }

    async cancelOrder(id: string, ownerId: string) {
        const order: Order = await this.OrderModel.findOneAndUpdate(
            { newsId: id, sellerId: ownerId },
            { orderStatus: ORDER_STATUS.CANCEL }
        )
        ValidateData.validateDataNotFound(order)
        if (order.orderStatus === ORDER_STATUS.DONE) {
            throw new BadRequestException()
        }
        await Promise.all([
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.BOOKING,
                objectId: order.id,
                userId: order.buyerId,
                title: 'Giao d???ch kh??ng th??nh c??ng',
                message:
                    'Ng?????i b??n ???? t??? ch???i l???ch h???n c???a b???n. Vui l??ng li??n h??? l???i',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `B???n ???? t??? ch???i l???ch h???n!`,
                message: 'C???m ???n b???n ???? s??? d???ng d???ch v???',
                projectId: order.newsId,
                fromId: order.buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(order.newsId, {
                status: STATUS.APPROVED,
            }),
        ])
    }
}
