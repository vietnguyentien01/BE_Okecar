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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const types_1 = require("../../shared/common/types");
const dto_1 = require("../../shared/common/dto");
const notification_entity_1 = require("./entities/notification.entity");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async viewById(id, ctx) {
        const notifications = await this.notificationService.viewNotification(id, {
            userId: ctx.user.id,
        });
        return new notification_entity_1.NotificationEntity(notifications);
    }
    async getNotification(query, ctx) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const notifications = await this.notificationService.getList(args, ctx.user.id);
        return {
            data: notifications.data.map((notifications) => notifications),
            meta: notifications.meta,
        };
    }
};
__decorate([
    common_1.Get('/notifications/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "viewById", null);
__decorate([
    common_1.Get('/notifications'),
    common_1.UseGuards(guards_1.AuthGuard),
    __param(0, common_1.Query()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto,
        types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getNotification", null);
NotificationController = __decorate([
    common_1.Controller(),
    common_1.UseGuards(guards_1.AuthGuard),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map