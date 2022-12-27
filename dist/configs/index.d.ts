export declare const env: string;
export declare const DB: any;
export declare const port: string;
export declare const mailKey: string;
export declare const telegramBotToken: string;
export declare const redisConfig: {
    host: string;
    port: number;
    db: number;
    password: string;
};
export declare const amzS3Config: {
    keyId: string;
    accessKey: string;
    bucketName: string;
};
export declare const elasticsearchConfig: {
    node: string;
    auth: {
        username: string;
        password: string;
    };
    maxRetries: number;
    requestTimeout: number;
};
