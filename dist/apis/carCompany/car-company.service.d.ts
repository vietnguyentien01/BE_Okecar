import { Model } from 'mongoose';
import { IListRequest, IListReturn } from '../../shared/common/interfaces';
import { CarCompanyCreateDto } from './dto/car-company-create-dto';
import { CarCompanyUpdateDto } from './dto/car-company-update-dto';
import { VehiclesCreateDto } from './dto/vehicles-create-dto';
import { VehiclesUpdateDto } from './dto/vehicles-update-dto';
import { VersionCreateDto } from './dto/version-create-dto';
import { VersionUpdateDto } from './dto/version-update-dto';
import { CarCompany } from './model/car-company.schema';
import { Vehicles } from './model/vehicles.schema';
import { Version } from './model/version.schema';
export declare class CarCompanyService {
    private readonly CarCompanyModel;
    private readonly VehiclesModel;
    private readonly VersionModel;
    constructor(CarCompanyModel: Model<CarCompany>, VehiclesModel: Model<Vehicles>, VersionModel: Model<Version>);
    createCarCompany(doc: CarCompanyCreateDto): Promise<CarCompany>;
    getList(args: IListRequest): Promise<IListReturn<CarCompany>>;
    getListVehicles(args: IListRequest, carCompanyId: string): Promise<IListReturn<Vehicles>>;
    updateCar(id: string, doc: CarCompanyUpdateDto): Promise<CarCompany>;
    updateVehicles(id: string, doc: VehiclesUpdateDto): Promise<Vehicles>;
    updateVersion(id: string, doc: VersionUpdateDto): Promise<Version>;
    deleteCar(id: string): Promise<{
        success: boolean;
    }>;
    deleteVehicles(id: string): Promise<{
        success: boolean;
    }>;
    createVehicles(doc: VehiclesCreateDto): Promise<Vehicles>;
    createVersion(doc: VersionCreateDto): Promise<Version>;
    getListVersion(args: IListRequest, vehiclesId: string): Promise<IListReturn<Version>>;
}
