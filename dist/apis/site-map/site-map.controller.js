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
exports.SiteMapController = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../storage/storage.service");
let SiteMapController = class SiteMapController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async createSiteMap() {
        await this.storageService.createSiteMap();
    }
    async getSitemap(key, res) {
        this.storageService
            .getFile(key)
            .then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/xml' });
            res.write(data.Body, 'binary');
            res.end(null, 'binary');
        })
            .catch(() => {
            res.sendStatus(404);
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteMapController.prototype, "createSiteMap", null);
__decorate([
    common_1.Get('/:key'),
    __param(0, common_1.Param('key')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteMapController.prototype, "getSitemap", null);
SiteMapController = __decorate([
    common_1.Controller('site-map'),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], SiteMapController);
exports.SiteMapController = SiteMapController;
//# sourceMappingURL=site-map.controller.js.map