import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    MongooseHealthIndicator,
} from '@nestjs/terminus'

// @ts-ignore
import packageJson = require('../package.json')

@Controller()
export class AppController {
    constructor(
        private health: HealthCheckService,
        private mongoose: MongooseHealthIndicator
    ) {
        console.log(`Start with version: ${packageJson.version}`)
    }

    @Get('/health')
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.mongoose.pingCheck('mongoose'),
            async () => ({ apiVersion: packageJson.version }),
        ])
    }
}
