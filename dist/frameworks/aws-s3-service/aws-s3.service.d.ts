import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
export declare class AwsS3Service {
    private s3;
    uploadFile(key: string, image: any, width: number, height: number): Promise<ManagedUpload.SendData>;
    getFile(key: string): Promise<S3.Types.GetObjectOutput>;
    uploadXmlFile(key: string, body: string): Promise<ManagedUpload.SendData>;
}
