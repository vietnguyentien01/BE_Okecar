import { BadRequestException } from '@nestjs/common'

import { ERROR } from '../constants'

export default class Validator {
    static validateEmail(email: string): string {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(email.toLowerCase())) {
            throw new BadRequestException()
        }
        return email.toLowerCase()
    }

    static validatePhone(phone: string): string {
        const phoneRe =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (!phoneRe.test(phone) || phone.length >= 12 || phone.length < 10) {
            throw new BadRequestException(ERROR.INVALID_PHONE)
        }
        return phone
    }

    static validatePassword(password: string): string {
        //Minimum 8, at least one uppercase letter, one lowercase letter, one number:
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/
        if (!re.test(password)) {
            throw new BadRequestException(ERROR.INVALID_PASSWORD)
        }
        return password
    }
}
