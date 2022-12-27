"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarCompanyModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../shared/constants");
const car_company_controller_1 = require("./car-company.controller");
const car_company_service_1 = require("./car-company.service");
const car_company_schema_1 = require("./model/car-company.schema");
const vehicles_schema_1 = require("./model/vehicles.schema");
const version_schema_1 = require("./model/version.schema");
const vehicles_controller_1 = require("./vehicles.controller");
const version_controller_1 = require("./version.controller");
let CarCompanyModule = class CarCompanyModule {
};
CarCompanyModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.COLLECTION.CAR_COMPANY, schema: car_company_schema_1.CarCompanySchema },
                { name: constants_1.COLLECTION.VEHICLES, schema: vehicles_schema_1.VehiclesSchema },
                { name: constants_1.COLLECTION.VERSION, schema: version_schema_1.VersionSchema },
            ]),
            jwt_1.JwtModule.register({}),
            common_1.HttpModule,
        ],
        providers: [car_company_service_1.CarCompanyService],
        controllers: [car_company_controller_1.CarCompanyController, vehicles_controller_1.VehiclesController, version_controller_1.VersionController],
        exports: [car_company_service_1.CarCompanyService],
    })
], CarCompanyModule);
exports.CarCompanyModule = CarCompanyModule;
//# sourceMappingURL=car-company.module.js.map