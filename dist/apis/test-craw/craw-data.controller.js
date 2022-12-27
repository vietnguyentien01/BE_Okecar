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
exports.CrawDataController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("../../shared/common/dto");
const craw_data_service_1 = require("./craw-data.service");
let CrawDataController = class CrawDataController {
    constructor(crawService) {
        this.crawService = crawService;
    }
    async multipleCreateProjects(file) {
        await this.crawService.multipleCreateProject(file);
    }
    async getNotification(query) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        };
        const notifications = await this.crawService.getList(args);
        return {
            data: notifications.data.map((notifications) => notifications),
            meta: notifications.meta,
        };
    }
};
__decorate([
    common_1.Post('/multiple-craw'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CrawDataController.prototype, "multipleCreateProjects", null);
__decorate([
    common_1.Get('/list-hotel'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CrawDataController.prototype, "getNotification", null);
CrawDataController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [craw_data_service_1.ScrapperService])
], CrawDataController);
exports.CrawDataController = CrawDataController;
//# sourceMappingURL=craw-data.controller.js.map