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
exports.CrawModelSchema = exports.CrawModel = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CrawModel = class CrawModel extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], CrawModel.prototype, "url", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CrawModel.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CrawModel.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], CrawModel.prototype, "rating", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], CrawModel.prototype, "reviews", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], CrawModel.prototype, "stars", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CrawModel.prototype, "image", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], CrawModel.prototype, "createdAt", void 0);
CrawModel = __decorate([
    mongoose_1.Schema()
], CrawModel);
exports.CrawModel = CrawModel;
exports.CrawModelSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(CrawModel), {
    timestamps: true,
});
//# sourceMappingURL=craw-model.js.map