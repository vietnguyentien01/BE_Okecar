import { Global, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Promise } from 'mongoose'

import { IListRequest, WhereInput } from '../../shared/common/interfaces'
import { COLLECTION, ERROR, NOTIFY_TYPE, STATUS } from '../../shared/constants'
import ValidateData from '../../shared/helper/validate-data'
import { CarCompanyEntity } from '../carCompany/entities/car-company.entity'
import { CarCompany } from '../carCompany/model/car-company.schema'
import { NotificationService } from '../notification/notification.service'
import { UserEntity } from '../users/entities/user.entity'
import { User } from '../users/model/user.schema'
import { FilterProduct } from './dto/filter-product'
import { ProductCreateDto } from './dto/product-create.dto'
import { ProductEntity } from './entites/product.entity'
import { Product } from './model/product.schema'

@Global()
@Injectable()
export class ProductService {
    constructor(
        @InjectModel(COLLECTION.PRODUCTS)
        private readonly ProductModel: Model<Product>,
        @InjectModel(COLLECTION.CAR_COMPANY)
        private readonly CarCompanyModel: Model<CarCompany>,
        @InjectModel(COLLECTION.USER)
        private readonly UserModel: Model<User>,
        private readonly notificationService: NotificationService
    ) {}

    async createProduct(doc: ProductCreateDto, userId: string) {
        doc.userId = userId
        const [user, carCompany] = await Promise.all([
            this.UserModel.findById(userId),
            this.CarCompanyModel.findById(doc.carCompanyId),
        ])
        ValidateData.validateDataNotFound(user, ERROR.CAN_NOT_FIND_USER)
        ValidateData.validateDataNotFound(carCompany, ERROR.CAN_NOT_CAR_COMPANY)
        const car = new this.ProductModel(doc)
        this.notificationService.createNotification({
            type: NOTIFY_TYPE.REVIEW_PRODUCTS,
            objectId: car._id,
            userId: userId,
            title: 'Tin của bạn đã đăng thành công!',
            message: 'Vui lòng chờ chúng tôi xét duyệt trong ít phút',
            projectId: car._id,
            fromId: '',
            uniqueKey: '',
        })
        await car.save()
    }

    async getList(args: IListRequest, options?: FilterProduct) {
        const { limit, offset } = args.pagination
        const queries = this.pickQueries(options)
        const products: Product[] = await this.ProductModel.find(queries)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!products) {
            throw new NotFoundException()
        }
        const companyTerm: WhereInput[] = []
        const userTerm: WhereInput[] = []

        for (const product of products) {
            companyTerm.push({ id: product.carCompanyId })
            userTerm.push({ id: product.userId })
        }

        const [total, carCompanys, users] = await Promise.all([
            this.ProductModel.count(queries),
            this.CarCompanyModel.find({ companyTerm }),
            this.UserModel.find({ userTerm }),
        ])
        return {
            data: products.map((product) => {
                const company = this.filterTypeObject(
                    carCompanys,
                    product.carCompanyId
                )

                const user = this.filterTypeObject(users, product.userId)

                return {
                    ...new ProductEntity(product),
                    company: new CarCompanyEntity(company),
                    user: new UserEntity(user),
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

    pickQueries(options?: FilterProduct): FilterQuery<Product> {
        const queries = {}
        options?.status &&
            Object.assign(queries, {
                status: {
                    $regex: new RegExp(`${options.status}`),
                    $options: 'i',
                },
            })

        options?.keyword &&
            Object.assign(queries, {
                title: {
                    $regex: new RegExp(`${options.keyword}`),
                    $options: 'i',
                },
            })

        options?.carCompanyId &&
            Object.assign(queries, {
                carCompanyId: options.carCompanyId,
            })

        options?.origin &&
            Object.assign(queries, {
                origin: options.origin,
            })

        options?.carStatus &&
            Object.assign(queries, {
                carStatus: options.carStatus,
            })

        options?.userId &&
            Object.assign(queries, {
                userId: options.userId,
            })

        options?.status &&
            Object.assign(queries, {
                status: options.status,
            })
        return queries
    }

    async updateProductStatus(id: string, status: STATUS): Promise<Product> {
        const product: Product = await this.ProductModel.findByIdAndUpdate(
            id,
            {
                status: status,
            },
            {
                new: true,
            }
        )
        ValidateData.validateDataNotFound(product, ERROR.CAN_NOT_FIND_PRODUCT)

        this.notificationService.createNotification({
            type: NOTIFY_TYPE.REVIEW_PRODUCTS,
            objectId: product.id,
            userId: product.userId,
            title:
                product.status === STATUS.APPROVED
                    ? 'Tin của bạn đã duyệt thành công thành công!'
                    : 'Tin của bạn đã bị từ chối!',
            message:
                product.status === STATUS.APPROVED
                    ? 'Tin bạn đã được đăng thành công'
                    : 'Xin vui lòng kiểm tra lại các thông tin',
            projectId: product.id,
            fromId: '',
            uniqueKey: '',
        })
        return product
    }

    async getOne(id: string) {
        const product: Product = await this.ProductModel.findById(id)
        ValidateData.validateDataNotFound(product, ERROR.CAN_NOT_FIND_DATA)
        const [carCompanys, users] = await Promise.all([
            this.CarCompanyModel.findById(product.carCompanyId),
            this.UserModel.findById(product.userId),
        ])

        return {
            ...new ProductEntity(product),
            company: new CarCompanyEntity(carCompanys),
            user: new UserEntity(users),
        }
    }

    filterTypeObject(data: any[], objectId: string) {
        if (data.length) {
            return data.find((r) => r.id === objectId)
        }
    }
}
