import { ValidationPipe, VersioningType } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from 'app.module'
import { config } from 'aws-sdk'

import { AllExceptionsFilter } from 'plugins/filters'
import { TransformInterceptor } from 'plugins/interceptors'

import { amzS3Config, port } from './configs'

async function bootstrap() {
    config.update(
        {
            s3BucketEndpoint: false,
            accessKeyId: amzS3Config.keyId,
            secretAccessKey: amzS3Config.accessKey,
        },
        true
    )
    const app = await NestFactory.create(AppModule)
    //Resolve cors
    app.enableCors({ origin: true })
    //option for producer
    const httpAdapterHost = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost))
    app.useGlobalInterceptors(new TransformInterceptor())

    app.setGlobalPrefix('v1')
    app.enableVersioning({
        type: VersioningType.URI,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
        })
    )
    await app.listen(port)
    console.log('OkeCar service running on port ' + port)
}

bootstrap()
