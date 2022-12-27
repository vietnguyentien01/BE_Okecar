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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const constants_1 = require("../../shared/constants");
const file_entity_1 = require("./entities/file.entity");
const storage_service_1 = require("./storage.service");
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async uploadImage(file) {
        const image = await this.storageService.uploadImage(file);
        return new file_entity_1.FileEntity(image);
    }
    async getImage(key, res) {
        this.storageService
            .getImage(key)
            .then((data) => {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.write(data.Body, 'binary');
            res.end(null, 'binary');
        })
            .catch(() => {
            res.sendStatus(404);
        });
    }
};
__decorate([
    common_1.Post('/image'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('image', {
        limits: { fileSize: constants_1.BASE_VALUE.LIMIT_IMAGE_SIZE },
    })),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadImage", null);
__decorate([
    common_1.Get('/image/:key'),
    __param(0, common_1.Param('key')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getImage", null);
StorageController = __decorate([
    common_1.Controller('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map