import { CAR_STATUS, ORIGIN, STATUS } from 'shared/constants'

import { ICarCompany } from './car-company.interface'
import { IImage } from './image'
import { IUser } from './user.interface'

export interface IProduct {
    id: string
    avatar: IImage[]
    videoLink: string
    carCompanyId: string
    vehiclesId: string
    versionName: string
    year: number
    carStatus: CAR_STATUS
    origin: ORIGIN
    gear: string
    fuel: string
    color: string
    price: number
    kilometers: number
    vehicleQuality: string
    title: string
    description: string
    location: string
    nameSeller: string
    phoneSeller: string
    addressSeller: string
    userId: string
    status: STATUS
    createdAt: Date
}

export interface IProductFull extends IProduct {
    user: IUser
    company: ICarCompany
}
