"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elasticsearchConfig = exports.amzS3Config = exports.redisConfig = exports.telegramBotToken = exports.mailKey = exports.port = exports.DB = exports.env = void 0;
const dotEnv = require("dotenv");
const db_1 = require("./db");
const mail_1 = require("./mail");
dotEnv.config();
const _env = process.env.NODE_ENV || 'development';
exports.env = _env;
exports.DB = db_1.db[exports.env];
exports.port = process.env.PORT || '9000';
exports.mailKey = mail_1.MailConfig.apiKey;
exports.telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
exports.redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    password: process.env.REDIS_PASSWORD,
};
exports.amzS3Config = {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    accessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
};
exports.elasticsearchConfig = {
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
    },
    maxRetries: 10,
    requestTimeout: 60000,
};
//# sourceMappingURL=index.js.map