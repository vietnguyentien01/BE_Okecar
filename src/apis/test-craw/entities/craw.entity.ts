// eslint-disable-next-line
import { ICraw } from '../../../interfaces/craw.interface'
import { CrawModel } from '../models/craw-model'

export interface CrawEntity extends ICraw {}

export class CrawEntity {
    constructor(partial: Partial<CrawModel>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.name = partial.name
            this.address = partial.address
            this.image = partial.image
            this.url = partial.url
            this.rating = partial.rating
            this.reviews = partial.reviews
            this.stars = partial.stars
            this.createdAt = partial.createdAt
        }
    }
}
