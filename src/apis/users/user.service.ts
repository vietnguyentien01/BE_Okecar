import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CacheService } from '../../frameworks/cache-service/cache.service'
import { IListRequest, IListReturn } from '../../shared/common/interfaces'
import { COLLECTION, ERROR, ROLE } from '../../shared/constants'
import { StoreDto } from '../auth/dto/store-input'
import { AdminUpdateDto } from './dto/admin-update-dto'
import { StoreUpdateDto } from './dto/store-update'
import { UserUpdateDto } from './dto/user-update'
import { User } from './model/user.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(COLLECTION.USER) private readonly UserModel: Model<User>,
        private readonly redis: CacheService
    ) {}

    async getOne(userId: any): Promise<User> {
        const user: User = await this.UserModel.findOne({ _id: userId })
        if (!user) {
            throw new NotFoundException(ERROR.CAN_NOT_FIND_USER)
        }
        return user
    }

    async updateUser(userId: any, doc: UserUpdateDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(userId, doc, {
            new: true,
        })
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }

    async getListUser(args: IListRequest): Promise<IListReturn<User>> {
        const { limit, offset } = args.pagination
        const users: User[] = await this.UserModel.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!users) {
            throw new NotFoundException()
        }

        const total = await this.UserModel.count()
        return {
            data: users,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async updateOne(id: string, doc: AdminUpdateDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(id, doc, {
            new: true,
        })
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }

    async registerToStore(id: string, doc: StoreDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(
            id,
            { role: ROLE.STORE, storeInfo: doc },
            {
                new: true,
            }
        )
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }

    async updateStore(id: string, doc: StoreUpdateDto): Promise<User> {
        const user: User = await this.UserModel.findByIdAndUpdate(
            id,
            { storeInfo: doc },
            {
                new: true,
            }
        )
        if (!user) {
            throw new NotAcceptableException()
        }

        return user
    }
}
