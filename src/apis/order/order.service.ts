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
                title: 'Bạn đã đặt lịch xem xe thành công',
                message:
                    'Nếu không phải là hành động của bạn, xin vui lòng liên hệ',
                projectId: product.id,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: product.id,
                userId: product.userId,
                title: `Bạn đã nhận được 1 lịch đặt hẹn xe từ người dùng ${buyer.userName} có Số điện thoại ${buyer.phone}`,
                message: 'Vui lòng sắp xếp thời gian để giao dịch',
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
                title: 'Giao dịch thành công',
                message: 'Bạn đã mua xe thành công ! Chúc mừng bạn',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `Xe của bạn đã được bán thành công!`,
                message: 'Cảm ởn bạn đã sử dụng dịch vụ',
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
                title: 'Giao dịch không thành công',
                message:
                    'Người bán đã từ chối lịch hẹn của bạn. Vui lòng liên hệ lại',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `Bạn đã từ chối lịch hẹn!`,
                message: 'Cảm ởn bạn đã sử dụng dịch vụ',
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
