import { RequestInfoType } from '../../shared/common/types';
import { StoreDto } from '../auth/dto/store-input';
import { StoreUpdateDto } from './dto/store-update';
import { UserUpdateDto } from './dto/user-update';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(ctx: RequestInfoType): Promise<UserEntity>;
    updateMyAccount(ctx: RequestInfoType, doc: UserUpdateDto): Promise<UserEntity>;
    registerStore(ctx: RequestInfoType, doc: StoreDto): Promise<UserEntity>;
    updateStore(ctx: RequestInfoType, doc: StoreUpdateDto): Promise<UserEntity>;
}
