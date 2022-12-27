// eslint-disable-next-line
import { ICarCompany } from '../../../interfaces/car-company.interface'
import { CarCompany } from '../model/car-company.schema'

// eslint-disable-next-line
export interface CarCompanyEntity extends ICarCompany {}

export class CarCompanyEntity {
    constructor(partial: Partial<CarCompany>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.avatar = partial.avatar
            this.name = partial.name
            this.createdAt = partial.createdAt
        }
    }
}
