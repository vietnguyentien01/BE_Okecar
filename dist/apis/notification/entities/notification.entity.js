"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEntity = void 0;
class NotificationEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.userId = partial.userId;
            this.fromId = partial.fromId;
            this.message = partial.message;
            this.title = partial.title;
            this.objectId = partial.objectId;
            this.projectId = partial.projectId;
            this.type = partial.type;
            this.isRead = partial.isRead;
            this.isSeen = partial.isSeen;
            this.createdAt = partial.createdAt;
            this.updatedAt = partial.updatedAt;
        }
    }
}
exports.NotificationEntity = NotificationEntity;
//# sourceMappingURL=notification.entity.js.map