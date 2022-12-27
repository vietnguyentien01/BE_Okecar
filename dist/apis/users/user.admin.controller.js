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
exports.UserAdminController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const constants_1 = require("../../shared/constants");
const dto_1 = require("../../shared/common/dto");
const admin_update_dto_1 = require("./dto/admin-update-dto");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
let UserAdminController = class UserAdminController {
    constructor(userService) {
        this.userService = userService;
    }
    async getListUserByAdmin(query) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const results = await this.userService.getListUser(args);
        return {
            data: results.data.map((user) => new user_entity_1.UserEntity(user)),
            meta: results.meta,
        };
    }
    async updateOne(id, doc) {
        const result = await this.userService.updateOne(id, doc);
        return new user_entity_1.UserEntity(result);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "getListUserByAdmin", null);
__decorate([
    common_1.Put('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_update_dto_1.AdminUpdateDto]),
    __metadata("design:returntype", Promise)
], UserAdminController.prototype, "updateOne", null);
UserAdminController = __decorate([
    common_1.Controller('/admin/users'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAdminController);
exports.UserAdminController = UserAdminController;
//# sourceMappingURL=user.admin.controller.js.map