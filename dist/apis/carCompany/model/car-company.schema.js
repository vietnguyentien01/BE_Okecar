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
exports.CarCompanySchema = exports.CarCompany = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_1 = require("../../../interfaces/image");
let CarCompany = class CarCompany extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], CarCompany.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        type: Mongo.Schema.Types.Mixed,
    }),
    __metadata("design:type", image_1.IImage)
], CarCompany.prototype, "avatar", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], CarCompany.prototype, "createdAt", void 0);
CarCompany = __decorate([
    mongoose_1.Schema()
], CarCompany);
exports.CarCompany = CarCompany;
exports.CarCompanySchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(CarCompany), {
    timestamps: true,
});
//# sourceMappingURL=car-company.schema.js.map