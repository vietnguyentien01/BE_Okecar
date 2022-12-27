/// <reference types="multer" />
import { S3 } from 'aws-sdk';
import { Model } from 'mongoose';
import { AwsS3Service } from 'frameworks/aws-s3-service/aws-s3.service';
import { File } from './model/file.schema';
export declare class StorageService {
    private readonly awsS3Service;
    private readonly FileUploadModel;
    constructor(awsS3Service: AwsS3Service, FileUploadModel: Model<File>);
    uploadImage(file: Express.Multer.File): Promise<File>;
    getImage(key: string): Promise<S3.GetObjectOutput>;
    createSiteMap(): Promise<void>;
    uploadXmlFile(key: string, sitemap: string): Promise<void>;
    getFile(key: string): Promise<S3.GetObjectOutput>;
}
