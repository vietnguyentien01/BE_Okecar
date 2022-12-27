import * as sharp from 'sharp'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { S3 } from 'aws-sdk'
import { Model } from 'mongoose'
import { v4 as uuid } from 'uuid'

import { AwsS3Service } from 'frameworks/aws-s3-service/aws-s3.service'
import { COLLECTION, ERROR } from 'shared/constants'

import { File } from './model/file.schema'

@Injectable()
export class StorageService {
    constructor(
        private readonly awsS3Service: AwsS3Service,
        @InjectModel(COLLECTION.FILE)
        private readonly FileUploadModel: Model<File>
    ) {}

    async uploadImage(file: Express.Multer.File): Promise<File> {
        const image = await sharp(file.buffer)
        const metadata = await image.metadata()

        const uploadResult = await this.awsS3Service.uploadFile(
            `${uuid()}-${new Date().getTime()}`,
            image.clone(),
            metadata.width,
            metadata.height
        )

        const createImage: File = new this.FileUploadModel({
            url: `/image/${uploadResult.Key}`,
            size: file.size,
            key: uploadResult.Key,
            width: metadata.width,
            height: metadata.height,
            lastRequest: new Date(),
        })

        const result = await createImage.save()

        if (!result) {
            throw new BadRequestException(ERROR.SOMETHING_WAS_WRONG)
        }

        return createImage
    }

    async getImage(key: string) {
        await this.FileUploadModel.findOneAndUpdate(
            { key: key },
            { lastRequest: new Date().getTime() }
        )
        return this.awsS3Service.getFile(key)
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
  `
        await this.uploadXmlFile('text_xml', sitemap)
    }

    async uploadXmlFile(key: string, sitemap: string) {
        await this.awsS3Service.uploadXmlFile(key, sitemap)
    }

    async getFile(key: string) {
        return this.awsS3Service.getFile(key)
    }
}
