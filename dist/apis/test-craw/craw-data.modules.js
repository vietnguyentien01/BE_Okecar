"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawDataModules = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../shared/constants");
const craw_data_controller_1 = require("./craw-data.controller");
const craw_data_service_1 = require("./craw-data.service");
const craw_model_1 = require("./models/craw-model");
let CrawDataModules = class CrawDataModules {
};
CrawDataModules = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.register({}),
            common_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.COLLECTION.CRAW, schema: craw_model_1.CrawModelSchema },
            ]),
        ],
        controllers: [craw_data_controller_1.CrawDataController],
        exports: [craw_data_service_1.ScrapperService],
        providers: [craw_data_service_1.ScrapperService],
    })
], CrawDataModules);
exports.CrawDataModules = CrawDataModules;
//# sourceMappingURL=craw-data.modules.js.map