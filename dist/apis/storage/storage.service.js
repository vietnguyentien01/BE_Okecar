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
exports.StorageService = void 0;
const sharp = require("sharp");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const aws_s3_service_1 = require("../../frameworks/aws-s3-service/aws-s3.service");
const constants_1 = require("../../shared/constants");
let StorageService = class StorageService {
    constructor(awsS3Service, FileUploadModel) {
        this.awsS3Service = awsS3Service;
        this.FileUploadModel = FileUploadModel;
    }
    async uploadImage(file) {
        const image = await sharp(file.buffer);
        const metadata = await image.metadata();
        const uploadResult = await this.awsS3Service.uploadFile(`${uuid_1.v4()}-${new Date().getTime()}`, image.clone(), metadata.width, metadata.height);
        const createImage = new this.FileUploadModel({
            url: `/image/${uploadResult.Key}`,
            size: file.size,
            key: uploadResult.Key,
            width: metadata.width,
            height: metadata.height,
            lastRequest: new Date(),
        });
        const result = await createImage.save();
        if (!result) {
            throw new common_1.BadRequestException(constants_1.ERROR.SOMETHING_WAS_WRONG);
        }
        return createImage;
    }
    async getImage(key) {
        await this.FileUploadModel.findOneAndUpdate({ key: key }, { lastRequest: new Date().getTime() });
        return this.awsS3Service.getFile(key);
    }
    async createSiteMap() {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://dev.trustgem.io/project/bsc/tbullflag-tbullflag-0x2098b570b8e94f3cc729dd0d2dd4049b32c54ca2</loc>
    </url>
    <url>
        <loc>https://dev.trustgem.io/project/non_evm/ski-sk-6371b8703fbb4d04c5ef4def</loc>
    </url>
    <url>
        <loc>https://dev.trustgem.io/project/non_evm/checki-ii-6371bb1e3fbb4d04c5ef4e60</loc>
    </url>
    <url>
        <loc>https://dev.trustgem.io/project/ethereum/proofofmemes-eth2.0-0x04a6b6de116fb8bf57e5ee8b05e0293ea3639fe8</loc>
    </url>
    <url>
        <loc>https://dev.trustgem.io/project/bsc/fofitokentest-fofi-token-test-0x80876135fce0c058a2b3b81fadf91e546a159e95</loc>
    </url>
</urlset>
  `;
        await this.uploadXmlFile('text_xml', sitemap);
    }
    async uploadXmlFile(key, sitemap) {
        await this.awsS3Service.uploadXmlFile(key, sitemap);
    }
    async getFile(key) {
        return this.awsS3Service.getFile(key);
    }
};
StorageService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_1.InjectModel(constants_1.COLLECTION.FILE)),
    __metadata("design:paramtypes", [aws_s3_service_1.AwsS3Service,
        mongoose_2.Model])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map