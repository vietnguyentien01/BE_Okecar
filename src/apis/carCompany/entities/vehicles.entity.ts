// eslint-disable-next-line
import { IVehicles } from '../../../interfaces/vehicles.interface'
import { Vehicles } from '../model/vehicles.schema'

// eslint-disable-next-line
export interface VehiclesEntity extends IVehicles {}

export class VehiclesEntity {
    constructor(partial: Partial<Vehicles>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.carCompanyId = partial.carCompanyId
            this.name = partial.name
            this.createdAt = partial.createdAt
        }
    }
}
