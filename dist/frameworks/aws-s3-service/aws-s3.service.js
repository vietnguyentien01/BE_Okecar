"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const configs_1 = require("../../configs");
let AwsS3Service = class AwsS3Service {
    constructor() {
        this.s3 = new aws_sdk_1.S3();
    }
    async uploadFile(key, image, width, height) {
        image = image.rotate().resize(width, height);
        const buffer = await image.toBuffer();
        return this.s3
            .upload({
            Bucket: configs_1.amzS3Config.bucketName,
            Body: buffer,
            Key: key,
        })
            .promise();
    }
    async getFile(key) {
        const params = {
            Bucket: configs_1.amzS3Config.bucketName,
            Key: key,
        };
        return this.s3.getObject(params).promise();
    }
    async uploadXmlFile(key, body) {
        try {
            return await this.s3
                .upload({
                Bucket: configs_1.amzS3Config.bucketName,
                Key: key,
                ContentType: 'binary',
                Body: Buffer.from(body, 'binary'),
            })
                .promise();
        }
        catch (e) {
            throw e;
        }
    }
};
AwsS3Service = __decorate([
    common_1.Injectable()
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws-s3.service.js.map