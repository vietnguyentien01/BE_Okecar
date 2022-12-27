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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const guards_1 = require("../../plugins/guards");
const dto_1 = require("../../shared/common/dto");
const types_1 = require("../../shared/common/types");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(productId, doc, ctx) {
        await this.orderService.createOrder(ctx.user.id, productId, doc);
    }
    async getList(query, buyerId, sellerId, status) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const options = {};
        buyerId && Object.assign(options, { buyerId: buyerId });
        sellerId && Object.assign(options, { sellerId: sellerId });
        status && Object.assign(options, { status: status });
        const results = await this.orderService.getList(args, options);
        return {
            data: results.data.map((product) => product),
            meta: results.meta,
        };
    }
    async confirmOrder(id, ctx) {
        await this.orderService.confirmOrder(id, ctx.user.id);
    }
    async cancelOrder(id, ctx) {
        await this.orderService.cancelOrder(id, ctx.user.id);
    }
};
__decorate([
    common_1.Post('/create/:productId'),
    __param(0, common_1.Param('productId')),
    __param(1, common_1.Body()),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto,
        types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    common_1.Get('/page'),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('buyerId')),
    __param(2, common_1.Query('sellerId')),
    __param(3, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto, String, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getList", null);
__decorate([
    common_1.Post('/confirm-order/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "confirmOrder", null);
__decorate([
    common_1.Post('/cancel-order/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.RequestInfoType]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
OrderController = __decorate([
    common_1.Controller('order'),
    common_1.UseGuards(guards_1.AuthGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map