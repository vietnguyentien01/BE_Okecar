import { Model } from 'mongoose';
import { CacheService } from '../../frameworks/cache-service/cache.service';
import { IListRequest, IListReturn } from '../../shared/common/interfaces';
import { StoreDto } from '../auth/dto/store-input';
import { AdminUpdateDto } from './dto/admin-update-dto';
import { StoreUpdateDto } from './dto/store-update';
import { UserUpdateDto } from './dto/user-update';
import { User } from './model/user.schema';
export declare class UserService {
    private readonly UserModel;
    private readonly redis;
    constructor(UserModel: Model<User>, redis: CacheService);
    getOne(userId: any): Promise<User>;
    updateUser(userId: any, doc: UserUpdateDto): Promise<User>;
    getListUser(args: IListRequest): Promise<IListReturn<User>>;
    updateOne(id: string, doc: AdminUpdateDto): Promise<User>;
    registerToStore(id: string, doc: StoreDto): Promise<User>;
    updateStore(id: string, doc: StoreUpdateDto): Promise<User>;
}
