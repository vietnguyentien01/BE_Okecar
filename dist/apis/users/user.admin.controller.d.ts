import { PaginationDto } from '../../shared/common/dto';
import { IListReturn } from '../../shared/common/interfaces';
import { AdminUpdateDto } from './dto/admin-update-dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserAdminController {
    private readonly userService;
    constructor(userService: UserService);
    getListUserByAdmin(query: PaginationDto): Promise<IListReturn<UserEntity>>;
    updateOne(id: string, doc: AdminUpdateDto): Promise<UserEntity>;
}
