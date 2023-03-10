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
exports.UserSchema = exports.User = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_1 = require("../../../interfaces/image");
const constants_1 = require("../../../shared/constants");
let User = class User extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop({
        type: Number,
    }),
    __metadata("design:type", Number)
], User.prototype, "birthday", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isBlocked", void 0);
__decorate([
    mongoose_1.Prop({
        type: Mongo.Schema.Types.Mixed,
    }),
    __metadata("design:type", image_1.IImage)
], User.prototype, "avatar", void 0);
__decorate([
    mongoose_1.Prop({
        type: Mongo.Schema.Types.Mixed,
    }),
    __metadata("design:type", Object)
], User.prototype, "storeInfo", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        enum: Object.values(constants_1.ROLE),
        default: constants_1.ROLE.NORMAL,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
User = __decorate([
    mongoose_1.Schema()
], User);
exports.User = User;
exports.UserSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(User), {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map