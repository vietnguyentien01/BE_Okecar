import { IUser } from '../../../interfaces/user.interface';
import { User } from '../model/user.schema';
export interface UserEntity extends IUser {
}
export declare class UserEntity {
    constructor(partial: Partial<User>);
}
