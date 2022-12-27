import { NotFoundException } from '@nestjs/common'

export default class ValidateData {
    static validateDataNotFound(data: any, error?: string) {
        if (!data) {
            throw new NotFoundException(error)
        }
    }
}
