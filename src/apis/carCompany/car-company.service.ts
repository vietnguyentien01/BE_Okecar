import { BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IListRequest, IListReturn } from '../../shared/common/interfaces'
import { COLLECTION } from '../../shared/constants'
import { CarCompanyCreateDto } from './dto/car-company-create-dto'
import { CarCompanyUpdateDto } from './dto/car-company-update-dto'
import { VehiclesCreateDto } from './dto/vehicles-create-dto'
import { VehiclesUpdateDto } from './dto/vehicles-update-dto'
import { VersionCreateDto } from './dto/version-create-dto'
import { VersionUpdateDto } from './dto/version-update-dto'
import { CarCompany } from './model/car-company.schema'
import { Vehicles } from './model/vehicles.schema'
import { Version } from './model/version.schema'

export class CarCompanyService {
    constructor(
        @InjectModel(COLLECTION.CAR_COMPANY)
        private readonly CarCompanyModel: Model<CarCompany>,
        @InjectModel(COLLECTION.VEHICLES)
        private readonly VehiclesModel: Model<Vehicles>,
        @InjectModel(COLLECTION.VERSION)
        private readonly VersionModel: Model<Version>
    ) {}

    async createCarCompany(doc: CarCompanyCreateDto): Promise<CarCompany> {
        console.log(doc)
        const carCompany = new this.CarCompanyModel(doc)
        return await carCompany.save()
    }

    async getList(args: IListRequest): Promise<IListReturn<CarCompany>> {
        const { limit, offset } = args.pagination
        const cars: CarCompany[] = await this.CarCompanyModel.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!cars) {
            throw new NotFoundException()
        }

        const total = await this.CarCompanyModel.count()
        return {
            data: cars,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async getListVehicles(
        args: IListRequest,
        carCompanyId: string
    ): Promise<IListReturn<Vehicles>> {
        const { limit, offset } = args.pagination
        const total = await this.VehiclesModel.count()
        const cars: Vehicles[] = await this.VehiclesModel.find({
            carCompanyId: carCompanyId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!cars) {
            return {
                data: [],
                meta: {
                    limit: limit,
                    offset: offset,
                    total: total,
                    totalPages: Math.ceil(total / args.pagination.limit),
                },
            }
        }

        return {
            data: cars,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }

    async updateCar(id: string, doc: CarCompanyUpdateDto): Promise<CarCompany> {
        const car: CarCompany = await this.CarCompanyModel.findByIdAndUpdate(
            id,
            doc,
            {
                new: true,
            }
        )

        if (!car) {
            throw new BadRequestException()
        }
        return car
    }

    async updateVehicles(
        id: string,
        doc: VehiclesUpdateDto
    ): Promise<Vehicles> {
        const vehicles: Vehicles = await this.VehiclesModel.findByIdAndUpdate(
            id,
            doc,
            {
                new: true,
            }
        )

        if (!vehicles) {
            throw new BadRequestException()
        }
        return vehicles
    }

    async updateVersion(id: string, doc: VersionUpdateDto): Promise<Version> {
        const version: Version = await this.VersionModel.findByIdAndUpdate(
            id,
            doc,
            {
                new: true,
            }
        )

        if (!version) {
            throw new BadRequestException()
        }
        return version
    }

    async deleteCar(id: string) {
        const product: CarCompany = await this.CarCompanyModel.findOneAndRemove(
            {
                _id: id,
            }
        )
        if (!product) {
            throw new BadRequestException()
        }

        return {
            success: !!product,
        }
    }

    async deleteVehicles(id: string) {
        const vehicles: Vehicles = await this.VehiclesModel.findOneAndRemove({
            _id: id,
        })
        if (!vehicles) {
            throw new BadRequestException()
        }

        return {
            success: !!vehicles,
        }
    }

    async createVehicles(doc: VehiclesCreateDto): Promise<Vehicles> {
        const car = await this.CarCompanyModel.findById(doc.carCompanyId)
        if (!car) {
            throw new BadRequestException()
        }
        const vehicles = new this.VehiclesModel(doc)
        return await vehicles.save()
    }

    async createVersion(doc: VersionCreateDto): Promise<Version> {
        const car = await this.VehiclesModel.findById(doc.vehiclesId)
        if (!car) {
            throw new BadRequestException()
        }
        const vehicles = new this.VersionModel(doc)
        return await vehicles.save()
    }

    async getListVersion(
        args: IListRequest,
        vehiclesId: string
    ): Promise<IListReturn<Version>> {
        const { limit, offset } = args.pagination
        const total = await this.VersionModel.count()
        const versions: Version[] = await this.VersionModel.find({
            vehiclesId: vehiclesId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!versions) {
            return {
                data: [],
                meta: {
                    limit: limit,
                    offset: offset,
                    total: total,
                    totalPages: Math.ceil(total / args.pagination.limit),
                },
            }
        }

        return {
            data: versions,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }
}
