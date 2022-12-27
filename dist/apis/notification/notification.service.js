"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
const notification_entity_1 = require("./entities/notification.entity");
let NotificationService = class NotificationService {
    constructor(NotificationModel) {
        this.NotificationModel = NotificationModel;
    }
    createNotification(doc) {
        const newNotification = new this.NotificationModel(Object.assign({}, doc));
        newNotification.save(function (err) {
            console.log(err);
        });
    }
    async viewNotification(_id, options) {
        const { userId } = options;
        const notify = await this.NotificationModel.findById(_id);
        if (!notify) {
            throw new common_1.NotFoundException(constants_1.ERROR.CAN_NOT_FIND_DATA);
        }
        if (userId !== notify.userId) {
            throw new common_1.ForbiddenException();
        }
        const newNotification = await this.NotificationModel.findByIdAndUpdate(_id, { isRead: true }, { new: true });
        return newNotification;
    }
    async getList(args, userId) {
        const { limit, offset } = args.pagination;
        const notifications = await this.NotificationModel.find({
            userId: userId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!notifications) {
            throw new common_1.NotFoundException();
        }
        const [total] = await mongoose_2.Promise.all([
            this.NotificationModel.count({ userId: userId }),
        ]);
        return {
            data: notifications.map((notification) => {
                return Object.assign({}, new notification_entity_1.NotificationEntity(notification));
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
    async readAllNotifications(userId) {
        try {
            await this.NotificationModel.updateMany({
                userId,
                isRead: false,
            }, { isRead: true, isSeen: true });
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.NOTIFICATION)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map