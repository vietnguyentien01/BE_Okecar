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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const types_1 = require("../../shared/common/types");
const store_input_1 = require("../auth/dto/store-input");
const store_update_1 = require("./dto/store-update");
const user_update_1 = require("./dto/user-update");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(ctx) {
        const result = await this.userService.getOne({ _id: ctx.user.id });
        return new user_entity_1.UserEntity(result);
    }
    async updateMyAccount(ctx, doc) {
        const user = await this.userService.updateUser(ctx.user.id, doc);
        return new user_entity_1.UserEntity(user);
    }
    async registerStore(ctx, doc) {
        const user = await this.userService.registerToStore(ctx.user.id, doc);
        return new user_entity_1.UserEntity(user);
    }
    async updateStore(ctx, doc) {
        const user = await this.userService.updateStore(ctx.user.id, doc);
        return new user_entity_1.UserEntity(user);
    }
};
__decorate([
    common_1.Get('/me'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Put('/me'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RequestInfoType,
        user_update_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMyAccount", null);
__decorate([
    common_1.Post('/register-store'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RequestInfoType,
        store_input_1.StoreDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerStore", null);
__decorate([
    common_1.Put('/register-store'),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.RequestInfoType,
        store_update_1.StoreUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStore", null);
UserController = __decorate([
    common_1.Controller('users'),
    common_1.UseGuards(guards_1.AuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map