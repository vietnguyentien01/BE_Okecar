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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarCompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
let CarCompanyService = class CarCompanyService {
    constructor(CarCompanyModel, VehiclesModel, VersionModel) {
        this.CarCompanyModel = CarCompanyModel;
        this.VehiclesModel = VehiclesModel;
        this.VersionModel = VersionModel;
    }
    async createCarCompany(doc) {
        console.log(doc);
        const carCompany = new this.CarCompanyModel(doc);
        return await carCompany.save();
    }
    async getList(args) {
        const { limit, offset } = args.pagination;
        const cars = await this.CarCompanyModel.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!cars) {
            throw new common_1.NotFoundException();
        }
        const total = await this.CarCompanyModel.count();
        return {
            data: cars,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
    async getListVehicles(args, carCompanyId) {
        const { limit, offset } = args.pagination;
        const total = await this.VehiclesModel.count();
        const cars = await this.VehiclesModel.find({
            carCompanyId: carCompanyId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!cars) {
            return {
                data: [],
                meta: {
                    limit: limit,
                    offset: offset,
                    total: total,
                    totalPages: Math.ceil(total / args.pagination.limit),
                },
            };
        }
        return {
            data: cars,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
    async updateCar(id, doc) {
        const car = await this.CarCompanyModel.findByIdAndUpdate(id, doc, {
            new: true,
        });
        if (!car) {
            throw new common_1.BadRequestException();
        }
        return car;
    }
    async updateVehicles(id, doc) {
        const vehicles = await this.VehiclesModel.findByIdAndUpdate(id, doc, {
            new: true,
        });
        if (!vehicles) {
            throw new common_1.BadRequestException();
        }
        return vehicles;
    }
    async updateVersion(id, doc) {
        const version = await this.VersionModel.findByIdAndUpdate(id, doc, {
            new: true,
        });
        if (!version) {
            throw new common_1.BadRequestException();
        }
        return version;
    }
    async deleteCar(id) {
        const product = await this.CarCompanyModel.findOneAndRemove({
            _id: id,
        });
        if (!product) {
            throw new common_1.BadRequestException();
        }
        return {
            success: !!product,
        };
    }
    async deleteVehicles(id) {
        const vehicles = await this.VehiclesModel.findOneAndRemove({
            _id: id,
        });
        if (!vehicles) {
            throw new common_1.BadRequestException();
        }
        return {
            success: !!vehicles,
        };
    }
    async createVehicles(doc) {
        const car = await this.CarCompanyModel.findById(doc.carCompanyId);
        if (!car) {
            throw new common_1.BadRequestException();
        }
        const vehicles = new this.VehiclesModel(doc);
        return await vehicles.save();
    }
    async createVersion(doc) {
        const car = await this.VehiclesModel.findById(doc.vehiclesId);
        if (!car) {
            throw new common_1.BadRequestException();
        }
        const vehicles = new this.VersionModel(doc);
        return await vehicles.save();
    }
    async getListVersion(args, vehiclesId) {
        const { limit, offset } = args.pagination;
        const total = await this.VersionModel.count();
        const versions = await this.VersionModel.find({
            vehiclesId: vehiclesId,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!versions) {
            return {
                data: [],
                meta: {
                    limit: limit,
                    offset: offset,
                    total: total,
                    totalPages: Math.ceil(total / args.pagination.limit),
                },
            };
        }
        return {
            data: versions,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
};
CarCompanyService = __decorate([
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.CAR_COMPANY)),
    __param(1, mongoose_1.InjectModel(constants_1.COLLECTION.VEHICLES)),
    __param(2, mongoose_1.InjectModel(constants_1.COLLECTION.VERSION)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CarCompanyService);
exports.CarCompanyService = CarCompanyService;
//# sourceMappingURL=car-company.service.js.map