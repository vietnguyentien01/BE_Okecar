"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../shared/constants");
const car_company_schema_1 = require("../carCompany/model/car-company.schema");
const notification_schema_1 = require("../notification/models/notification.schema");
const user_schema_1 = require("../users/model/user.schema");
const product_schema_1 = require("./model/product.schema");
const product_admin_controller_1 = require("./product.admin.controller");
const product_controller_1 = require("./product.controller");
const product_public_controller_1 = require("./product.public.controller");
const product_service_1 = require("./product.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.COLLECTION.PRODUCTS, schema: product_schema_1.ProductSchema },
                { name: constants_1.COLLECTION.CAR_COMPANY, schema: car_company_schema_1.CarCompanySchema },
                { name: constants_1.COLLECTION.USER, schema: user_schema_1.UserSchema },
                { name: constants_1.COLLECTION.NOTIFICATION, schema: notification_schema_1.NotificationSchema },
            ]),
            jwt_1.JwtModule.register({}),
            common_1.HttpModule,
        ],
        providers: [product_service_1.ProductService],
        controllers: [
            product_controller_1.ProductController,
            product_admin_controller_1.ProductAdminController,
            product_public_controller_1.ProductPublicController,
        ],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map