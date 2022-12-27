// eslint-disable-next-line
import { IUser } from '../../../interfaces/user.interface'
import { User } from '../model/user.schema'

// eslint-disable-next-line
export interface UserEntity extends IUser {}

export class UserEntity {
    constructor(partial: Partial<User>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.userName = partial.userName
            this.role = partial.role
            this.address = partial.address
            this.avatar = partial.avatar
            this.storeInfo = partial.storeInfo
            this.phone = partial.phone
            this.email = partial.email
            this.avatar = partial.avatar
            this.userName = partial.userName
            this.birthday = partial.birthday
            this.isBlocked = partial.isBlocked
            this.createdAt = partial.createdAt
        }
    }
}
