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
exports.ProductSchema = exports.Product = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
let Product = class Product extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: Mongo.Schema.Types.Mixed,
    }),
    __metadata("design:type", Array)
], Product.prototype, "avatar", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "videoLink", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "carCompanyId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "vehiclesId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "versionName", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
    }),
    __metadata("design:type", Number)
], Product.prototype, "year", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: Object.values(constants_1.CAR_STATUS),
    }),
    __metadata("design:type", String)
], Product.prototype, "carStatus", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: Object.values(constants_1.ORIGIN),
    }),
    __metadata("design:type", String)
], Product.prototype, "origin", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "gear", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "fuel", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "color", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", Number)
], Product.prototype, "kilometers", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Product.prototype, "vehicleQuality", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "nameSeller", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "phoneSeller", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "addressSeller", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "userId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "location", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: Object.values(constants_1.STATUS),
        default: constants_1.STATUS.PENDING,
    }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
Product = __decorate([
    mongoose_1.Schema()
], Product);
exports.Product = Product;
exports.ProductSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(Product), {
    timestamps: true,
});
//# sourceMappingURL=product.schema.js.map