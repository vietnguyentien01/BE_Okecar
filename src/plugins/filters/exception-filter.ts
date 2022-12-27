import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.

        const { httpAdapter } = this.httpAdapterHost
        const ctx = host.switchToHttp()

        // const request = ctx.getRequest<Request>()
        if (process.env.NODE_ENV !== 'production') {
            console.error(exception)
        }

        if (exception instanceof HttpException) {
            const response = ctx.getResponse<Response>()
            const logstash = {
                authorization:
                    !!response.req.headers.authorization === true
                        ? response.req.headers.authorization
                        : '',
                originalUrl:
                    !!response.req.originalUrl === true
                        ? response.req.originalUrl
                        : '',
                host:
                    !!response.req.headers.host === true
                        ? response.req.headers.host
                        : 'localhost',
                ip:
                    !!response.req.headers['x-real-ip'] === true
                        ? response.req.headers['x-real-ip']
                        : '127.0.0.1',
                // originalMethod: !!response.originalMethod === true ? response.req.originalMethod : response.req.method,
                body: response.req.body,
                stack:
                    !!exception.stack === true
                        ? JSON.stringify(exception.stack)
                        : JSON.stringify(exception),
            }
            console.log('logstash', logstash)
        }

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        const excResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception

        const message = excResponse['message'] || 'something_was_wrong'

        const responseBody = {
            statusCode: httpStatus,
            message: typeof message === 'string' ? [message] : message,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}
