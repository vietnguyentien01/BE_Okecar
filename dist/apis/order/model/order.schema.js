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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
let Order = class Order extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "buyerId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "sellerId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "newsId", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "bookingDate", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Order.prototype, "paymentTime", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: constants_1.PAYMENT_STATUS.UN_PAID,
        enum: Object.values(constants_1.PAYMENT_STATUS),
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentStatus", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: constants_1.ORDER_STATUS.CONFIRMING,
        enum: Object.values(constants_1.ORDER_STATUS),
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    mongoose_1.Schema()
], Order);
exports.Order = Order;
exports.OrderSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(Order), {
    timestamps: true,
});
//# sourceMappingURL=order.schema.js.map