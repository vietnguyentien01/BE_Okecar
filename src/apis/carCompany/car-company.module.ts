import { HttpModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { COLLECTION } from '../../shared/constants'
import { CarCompanyController } from './car-company.controller'
import { CarCompanyService } from './car-company.service'
import { CarCompanySchema } from './model/car-company.schema'
import { VehiclesSchema } from './model/vehicles.schema'
import { VersionSchema } from './model/version.schema'
import { VehiclesController } from './vehicles.controller'
import { VersionController } from './version.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: COLLECTION.CAR_COMPANY, schema: CarCompanySchema },
            { name: COLLECTION.VEHICLES, schema: VehiclesSchema },
            { name: COLLECTION.VERSION, schema: VersionSchema },
        ]),
        JwtModule.register({}),
        HttpModule,
    ],
    providers: [CarCompanyService],
    controllers: [CarCompanyController, VehiclesController, VersionController],
    exports: [CarCompanyService],
})
export class CarCompanyModule {}
