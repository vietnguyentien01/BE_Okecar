"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../shared/constants");
const product_schema_1 = require("../product/model/product.schema");
const user_schema_1 = require("../users/model/user.schema");
const order_schema_1 = require("./model/order.schema");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.COLLECTION.ORDER, schema: order_schema_1.OrderSchema },
                { name: constants_1.COLLECTION.PRODUCTS, schema: product_schema_1.ProductSchema },
                { name: constants_1.COLLECTION.USER, schema: user_schema_1.UserSchema },
            ]),
            jwt_1.JwtModule.register({}),
        ],
        providers: [order_service_1.OrderService],
        controllers: [order_controller_1.OrderController],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map