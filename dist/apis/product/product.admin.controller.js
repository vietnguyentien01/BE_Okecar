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
exports.ProductAdminController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const dto_1 = require("../../shared/common/dto");
const constants_1 = require("../../shared/constants");
const product_entity_1 = require("./entites/product.entity");
const product_service_1 = require("./product.service");
let ProductAdminController = class ProductAdminController {
    constructor(productService) {
        this.productService = productService;
    }
    async getList(query, status) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const results = await this.productService.getList(args, {
            status,
        });
        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        };
    }
    async confirmStatus(id, status) {
        const product = await this.productService.updateProductStatus(id, status);
        return new product_entity_1.ProductEntity(product);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto, String]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "getList", null);
__decorate([
    common_1.Put('/confirm-status/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "confirmStatus", null);
ProductAdminController = __decorate([
    common_1.Controller('admin/products'),
    common_1.UseGuards(guards_1.AuthGuard),
    guards_1.Roles(constants_1.ROLE.ADMIN),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductAdminController);
exports.ProductAdminController = ProductAdminController;
//# sourceMappingURL=product.admin.controller.js.map