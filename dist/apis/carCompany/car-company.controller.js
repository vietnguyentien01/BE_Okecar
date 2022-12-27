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
exports.CarCompanyController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const dto_1 = require("../../shared/common/dto");
const constants_1 = require("../../shared/constants");
const car_company_service_1 = require("./car-company.service");
const car_company_create_dto_1 = require("./dto/car-company-create-dto");
const car_company_update_dto_1 = require("./dto/car-company-update-dto");
const car_company_entity_1 = require("./entities/car-company.entity");
let CarCompanyController = class CarCompanyController {
    constructor(carCompanyService) {
        this.carCompanyService = carCompanyService;
    }
    async createCarCompany(doc) {
        const result = await this.carCompanyService.createCarCompany(doc);
        return new car_company_entity_1.CarCompanyEntity(result);
    }
    async updateCarCompany(id, doc) {
        const result = await this.carCompanyService.updateCar(id, doc);
        return new car_company_entity_1.CarCompanyEntity(result);
    }
    async deleteCar(id) {
        await this.carCompanyService.deleteCar(id);
    }
    async getList(query) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const results = await this.carCompanyService.getList(args);
        return {
            data: results.data.map((user) => new car_company_entity_1.CarCompanyEntity(user)),
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
    __metadata("design:paramtypes", [car_company_create_dto_1.CarCompanyCreateDto]),
    __metadata("design:returntype", Promise)
], CarCompanyController.prototype, "createCarCompany", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, car_company_update_dto_1.CarCompanyUpdateDto]),
    __metadata("design:returntype", Promise)
], CarCompanyController.prototype, "updateCarCompany", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarCompanyController.prototype, "deleteCar", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CarCompanyController.prototype, "getList", null);
CarCompanyController = __decorate([
    common_1.Controller('product-company'),
    __metadata("design:paramtypes", [car_company_service_1.CarCompanyService])
], CarCompanyController);
exports.CarCompanyController = CarCompanyController;
//# sourceMappingURL=car-company.controller.js.map