export declare const db: {
    development: {
        IS_DEBUG: boolean;
        DB_URL: string;
        OPTION: {
            autoIndex: boolean;
            retryAttempts: number;
            retryDelay: number;
        };
    };
    test: {};
    staging: {
        URI: string;
        USERNAME: string;
        PASSWORD: string;
        IS_DEBUG: boolean;
        AUTH_DB: string;
        DB_URL: string;
        OPTION: {
            autoIndex: boolean;
            retryAttempts: number;
            retryDelay: number;
        };
    };
    production: {
        URI: string;
        USERNAME: string;
        PASSWORD: string;
        IS_DEBUG: boolean;
        AUTH_DB: string;
        DB_URL: string;
        OPTION: {
            autoIndex: boolean;
            reconnectTries: number;
            retryAttempts: number;
            retryDelay: number;
        };
    };
};
