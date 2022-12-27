// eslint-disable-next-line
import { IVersion } from '../../../interfaces/version.interface'
import { Version } from '../model/version.schema'

// eslint-disable-next-line
export interface VersionEntity extends IVersion {}

export class VersionEntity {
    constructor(partial: Partial<Version>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.vehiclesId = partial.vehiclesId
            this.name = partial.name
            this.createdAt = partial.createdAt
        }
    }
}
