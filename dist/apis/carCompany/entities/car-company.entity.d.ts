import { ICarCompany } from '../../../interfaces/car-company.interface';
import { CarCompany } from '../model/car-company.schema';
export interface CarCompanyEntity extends ICarCompany {
}
export declare class CarCompanyEntity {
    constructor(partial: Partial<CarCompany>);
}
