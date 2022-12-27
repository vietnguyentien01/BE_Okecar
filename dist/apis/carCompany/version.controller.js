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
exports.VersionController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const dto_1 = require("../../shared/common/dto");
const constants_1 = require("../../shared/constants");
const car_company_service_1 = require("./car-company.service");
const version_create_dto_1 = require("./dto/version-create-dto");
const version_update_dto_1 = require("./dto/version-update-dto");
const version_entity_1 = require("./entities/version.entity");
let VersionController = class VersionController {
    constructor(carCompanyService) {
        this.carCompanyService = carCompanyService;
    }
    async create(doc) {
        const result = await this.carCompanyService.createVersion(doc);
        return new version_entity_1.VersionEntity(result);
    }
    async update(id, doc) {
        const result = await this.carCompanyService.updateVersion(id, doc);
        return new version_entity_1.VersionEntity(result);
    }
    async delete(id) {
        await this.carCompanyService.deleteVehicles(id);
    }
    async getList(id, query) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const results = await this.carCompanyService.getListVersion(args, id);
        return {
            data: results.data.map((version) => new version_entity_1.VersionEntity(version)),
            meta: results.meta,
        };
    }
};
__decorate([
    common_1.Post(''),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [version_create_dto_1.VersionCreateDto]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "create", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, version_update_dto_1.VersionUpdateDto]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "delete", null);
__decorate([
    common_1.Get('/by-vehicles/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "getList", null);
VersionController = __decorate([
    common_1.Controller('version'),
    __metadata("design:paramtypes", [car_company_service_1.CarCompanyService])
], VersionController);
exports.VersionController = VersionController;
//# sourceMappingURL=version.controller.js.map