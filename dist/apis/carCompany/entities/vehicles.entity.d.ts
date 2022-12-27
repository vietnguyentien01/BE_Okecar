import { IVehicles } from '../../../interfaces/vehicles.interface';
import { Vehicles } from '../model/vehicles.schema';
export interface VehiclesEntity extends IVehicles {
}
export declare class VehiclesEntity {
    constructor(partial: Partial<Vehicles>);
}
