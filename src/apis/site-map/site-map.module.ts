import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { SiteMapController } from './site-map.controller'

@Module({
    imports: [JwtModule.register({}), HttpModule],
    controllers: [SiteMapController],
})
export class SiteMapModule {}
