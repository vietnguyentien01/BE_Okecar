"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const aws_sdk_1 = require("aws-sdk");
const filters_1 = require("./plugins/filters");
const interceptors_1 = require("./plugins/interceptors");
const configs_1 = require("./configs");
async function bootstrap() {
    aws_sdk_1.config.update({
        s3BucketEndpoint: false,
        accessKeyId: configs_1.amzS3Config.keyId,
        secretAccessKey: configs_1.amzS3Config.accessKey,
    }, true);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true });
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new filters_1.AllExceptionsFilter(httpAdapterHost));
    app.useGlobalInterceptors(new interceptors_1.TransformInterceptor());
    app.setGlobalPrefix('v1');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    await app.listen(configs_1.port);
    console.log('OkeCar service running on port ' + configs_1.port);
}
bootstrap();
//# sourceMappingURL=main.js.map