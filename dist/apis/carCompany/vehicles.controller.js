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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const dto_1 = require("../../shared/common/dto");
const constants_1 = require("../../shared/constants");
const car_company_service_1 = require("./car-company.service");
const vehicles_create_dto_1 = require("./dto/vehicles-create-dto");
const vehicles_update_dto_1 = require("./dto/vehicles-update-dto");
const vehicles_entity_1 = require("./entities/vehicles.entity");
let VehiclesController = class VehiclesController {
    constructor(carCompanyService) {
        this.carCompanyService = carCompanyService;
    }
    async create(doc) {
        const result = await this.carCompanyService.createVehicles(doc);
        return new vehicles_entity_1.VehiclesEntity(result);
    }
    async update(id, doc) {
        const result = await this.carCompanyService.updateVehicles(id, doc);
        return new vehicles_entity_1.VehiclesEntity(result);
    }
    async delete(id) {
        await this.carCompanyService.deleteVehicles(id);
    }
    async getList(id, query) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const results = await this.carCompanyService.getListVehicles(args, id);
        return {
            data: results.data.map((vehicles) => new vehicles_entity_1.VehiclesEntity(vehicles)),
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
    __metadata("design:paramtypes", [vehicles_create_dto_1.VehiclesCreateDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "create", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vehicles_update_dto_1.VehiclesUpdateDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "delete", null);
__decorate([
    common_1.Get('/by-product-company/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getList", null);
VehiclesController = __decorate([
    common_1.Controller('vehicles'),
    __metadata("design:paramtypes", [car_company_service_1.CarCompanyService])
], VehiclesController);
exports.VehiclesController = VehiclesController;
//# sourceMappingURL=vehicles.controller.js.map