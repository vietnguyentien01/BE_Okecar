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
exports.NotificationSchema = exports.Notification = void 0;
const Mongo = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../shared/constants");
let Notification = class Notification extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
    }),
    __metadata("design:type", String)
], Notification.prototype, "fromId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Notification.prototype, "objectId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        default: '',
    }),
    __metadata("design:type", String)
], Notification.prototype, "projectId", void 0);
__decorate([
    mongoose_1.Prop({
        type: String,
        required: true,
        enum: Object.values(constants_1.NOTIFY_TYPE),
    }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isSeen", void 0);
__decorate([
    mongoose_1.Prop({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({
        type: Date,
    }),
    __metadata("design:type", Date)
], Notification.prototype, "updatedAt", void 0);
Notification = __decorate([
    mongoose_1.Schema()
], Notification);
exports.Notification = Notification;
exports.NotificationSchema = new Mongo.Schema(mongoose_1.SchemaFactory.createForClass(Notification), {
    timestamps: true,
});
//# sourceMappingURL=notification.schema.js.map