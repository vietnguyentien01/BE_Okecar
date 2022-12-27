import * as dotEnv from 'dotenv'

import { db } from './db'
import { MailConfig } from './mail'

dotEnv.config()

const _env = process.env.NODE_ENV || 'development'
export const env = _env
export const DB = db[env]
export const port = process.env.PORT || '9000'
export const mailKey = MailConfig.apiKey
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN

export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    password: process.env.REDIS_PASSWORD,
}

export const amzS3Config = {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    accessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
}

export const elasticsearchConfig = {
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
    },
    maxRetries: 10,
    requestTimeout: 60000,
}
