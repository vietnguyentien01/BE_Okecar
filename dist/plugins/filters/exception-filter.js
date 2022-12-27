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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (process.env.NODE_ENV !== 'production') {
            console.error(exception);
        }
        if (exception instanceof common_1.HttpException) {
            const response = ctx.getResponse();
            const logstash = {
                authorization: !!response.req.headers.authorization === true
                    ? response.req.headers.authorization
                    : '',
                originalUrl: !!response.req.originalUrl === true
                    ? response.req.originalUrl
                    : '',
                host: !!response.req.headers.host === true
                    ? response.req.headers.host
                    : 'localhost',
                ip: !!response.req.headers['x-real-ip'] === true
                    ? response.req.headers['x-real-ip']
                    : '127.0.0.1',
                body: response.req.body,
                stack: !!exception.stack === true
                    ? JSON.stringify(exception.stack)
                    : JSON.stringify(exception),
            };
            console.log('logstash', logstash);
        }
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const excResponse = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : exception;
        const message = excResponse['message'] || 'something_was_wrong';
        const responseBody = {
            statusCode: httpStatus,
            message: typeof message === 'string' ? [message] : message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=exception-filter.js.map