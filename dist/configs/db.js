"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotEnv = require("dotenv");
dotEnv.config();
exports.db = {
    development: {
        IS_DEBUG: true,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: true,
            retryAttempts: Number.MAX_VALUE,
            retryDelay: 500,
        },
    },
    test: {},
    staging: {
        URI: process.env.MONGODB_URL,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
        IS_DEBUG: false,
        AUTH_DB: process.env.MONGODB_AUTH_DB,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false,
            retryAttempts: Number.MAX_VALUE,
            retryDelay: 500,
        },
    },
    production: {
        URI: process.env.MONGODB_URL,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
        IS_DEBUG: false,
        AUTH_DB: process.env.MONGODB_AUTH_DB,
        DB_URL: process.env.DB_URL,
        OPTION: {
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            retryAttempts: Number.MAX_VALUE,
            retryDelay: 500,
        },
    },
};
//# sourceMappingURL=db.js.map