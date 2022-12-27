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
exports.ProductPublicController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../shared/common/dto");
const product_service_1 = require("./product.service");
let ProductPublicController = class ProductPublicController {
    constructor(productService) {
        this.productService = productService;
    }
    async getList(query, carStatus, origin, carCompanyId, vehiclesId, keyword, status) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const options = {};
        carStatus && Object.assign(options, { carStatus: carStatus });
        origin && Object.assign(options, { origin: origin });
        carCompanyId && Object.assign(options, { carCompanyId: carCompanyId });
        vehiclesId && Object.assign(options, { vehiclesId: vehiclesId });
        keyword && Object.assign(options, { keyword: keyword });
        status && Object.assign(options, { status: status });
        const results = await this.productService.getList(args, options);
        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        };
    }
    async getOne(id) {
        return await this.productService.getOne(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('carStatus')),
    __param(2, common_1.Query('origin')),
    __param(3, common_1.Query('carCompanyId')),
    __param(4, common_1.Query('vehiclesId')),
    __param(5, common_1.Query('keyword')),
    __param(6, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductPublicController.prototype, "getList", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductPublicController.prototype, "getOne", null);
ProductPublicController = __decorate([
    common_1.Controller('public/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductPublicController);
exports.ProductPublicController = ProductPublicController;
//# sourceMappingURL=product.public.controller.js.map