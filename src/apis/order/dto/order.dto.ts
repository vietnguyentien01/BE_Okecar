import { IsDate, IsNotEmpty } from 'class-validator'

export class OrderDto {
    @IsNotEmpty()
    bookingDate: Date
}
