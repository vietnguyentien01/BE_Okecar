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
exports.VehiclesSchema = exports.Vehicles = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Vehicles = class Vehicles extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Vehicles.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Vehicles.prototype, "carCompanyId", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Vehicles.prototype, "createdAt", void 0);
Vehicles = __decorate([
    mongoose_1.Schema()
], Vehicles);
exports.Vehicles = Vehicles;
exports.VehiclesSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(Vehicles), {
    timestamps: true,
});
//# sourceMappingURL=vehicles.schema.js.map