"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../shared/constants");
const aws_s3_service_1 = require("../../frameworks/aws-s3-service/aws-s3.service");
const file_schema_1 = require("./model/file.schema");
const storage_controller_1 = require("./storage.controller");
const storage_service_1 = require("./storage.service");
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: constants_1.COLLECTION.FILE, schema: file_schema_1.FileSchema },
            ]),
            jwt_1.JwtModule.register({}),
        ],
        providers: [storage_service_1.StorageService, aws_s3_service_1.AwsS3Service],
        controllers: [storage_controller_1.StorageController],
        exports: [storage_service_1.StorageService, aws_s3_service_1.AwsS3Service],
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map