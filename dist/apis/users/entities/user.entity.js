"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.userName = partial.userName;
            this.role = partial.role;
            this.address = partial.address;
            this.avatar = partial.avatar;
            this.storeInfo = partial.storeInfo;
            this.phone = partial.phone;
            this.email = partial.email;
            this.avatar = partial.avatar;
            this.userName = partial.userName;
            this.birthday = partial.birthday;
            this.isBlocked = partial.isBlocked;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map