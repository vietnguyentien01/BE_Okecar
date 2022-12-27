"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const terminus_1 = require("@nestjs/terminus");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./apis/auth/auth.module");
const car_company_module_1 = require("./apis/carCompany/car-company.module");
const notification_module_1 = require("./apis/notification/notification.module");
const order_module_1 = require("./apis/order/order.module");
const product_module_1 = require("./apis/product/product.module");
const site_map_module_1 = require("./apis/site-map/site-map.module");
const storage_module_1 = require("./apis/storage/storage.module");
const craw_data_modules_1 = require("./apis/test-craw/craw-data.modules");
const user_module_1 = require("./apis/users/user.module");
const app_controller_1 = require("./app.controller");
const configs_1 = require("./configs");
const cache_module_1 = require("./frameworks/cache-service/cache.module");
const mail_module_1 = require("./frameworks/mail-service/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(configs_1.DB.DB_URL, configs_1.DB.OPTION),
            schedule_1.ScheduleModule.forRoot(),
            terminus_1.TerminusModule,
            cache_module_1.RedisCacheModule,
            user_module_1.UserModule,
            storage_module_1.StorageModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            car_company_module_1.CarCompanyModule,
            product_module_1.ProductModule,
            notification_module_1.NotificationModule,
            site_map_module_1.SiteMapModule,
            craw_data_modules_1.CrawDataModules,
            order_module_1.OrderModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 90,
                limit: 1,
            }),
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map