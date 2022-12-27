import * as bcrypt from 'bcrypt'
import { BadRequestException, Global, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Promise } from 'mongoose'

import { CacheService } from '../../frameworks/cache-service/cache.service'
import { MailService } from '../../frameworks/mail-service/mail-service'
import { BASE_VALUE, COLLECTION, ERROR } from '../../shared/constants'
import GenerateCode from '../../shared/helper/generate-code'
import Validator from '../../shared/helper/validate'
import { UserEntity } from '../users/entities/user.entity'
import { User } from '../users/model/user.schema'
import {
    ChangePassword,
    forgotPass,
    LoginDto,
    PreRegisterDto,
    VerifyDto,
} from './dto'
import { RegisterInput } from './dto/register-input'
import { ILoginResponse } from './entities/login-response.entity'

@Global()
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly redis: CacheService,
        private readonly mailService: MailService,
        @InjectModel(COLLECTION.USER) private readonly UserModel: Model<User>
    ) {}

    async register(doc: RegisterInput): Promise<ILoginResponse> {
        const email = Validator.validateEmail(doc.email)
        const password = Validator.validatePassword(doc.password)
        const [hash, user] = await Promise.all([
            bcrypt.hash(password, 10),
            this.UserModel.findOne({ email: email }),
        ])

        if (user) {
            throw new BadRequestException(ERROR.DUPLICATE_USER)
        }
        try {
            const newUser = new this.UserModel({
                ...doc,
                password: hash,
            })

            const user = await newUser.save()

            const payload = {
                user: {
                    _id: user.id,
                    time: new Date().getTime(),
                },
            }

            const token = this.jwtService.sign(payload)
            await this.redis.set(token, new UserEntity(user), 48 * 3600)
            return {
                user: new UserEntity(user),
                access_token: token,
            }
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async login(doc: LoginDto): Promise<ILoginResponse> {
        const password = Validator.validatePassword(doc.password)
        const user: User = await this.UserModel.findOne({
            userName: doc.userName,
        })
        if (!user) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_USER)
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
            throw new BadRequestException(ERROR.INVALID_PASSWORD)
        }

        const payload = {
            user: {
                _id: user.id,
                time: new Date().getTime(),
            },
        }
        const token = this.jwtService.sign(payload)
        await this.redis.set(token, new UserEntity(user), 48 * 3600)
        return {
            user: new UserEntity(user),
            access_token: token,
        }
    }

    async logout(token: string) {
        const user = await this.redis.get(token)

        await Promise.all([
            this.redis.del(token),
            user ? this.redis.del(user.address) : null,
        ])
    }

    async preRegister(doc: PreRegisterDto) {
        const email = Validator.validateEmail(doc.email)
        const user: User = await this.UserModel.findOne({
            email: email,
        })

        if (user) {
            throw new BadRequestException(ERROR.DUPLICATE_USER)
        }

        const verifyCode = GenerateCode.create({
            length: 4,
            charset: '123456789',
        })

        const id: string = COLLECTION.VERIFY_REGISTER + verifyCode + email

        console.log(verifyCode)
        await Promise.all([
            this.redis.set(id, id, BASE_VALUE.TTL_ACCESS_TOKEN_REDIS),
            this.mailService.sendRegisterOTP(verifyCode, email),
        ])
    }

    async verifyCodeRegister(doc: VerifyDto) {
        const confirmCode = await this.redis.get(
            COLLECTION.VERIFY_REGISTER + doc.code + doc.email
        )

        if (!confirmCode) {
            throw new BadRequestException(ERROR.INVALID_OTP)
        }

        await Promise.all([this.redis.del(confirmCode)])

        return {
            success: true,
        }
    }

    async changePassWord(doc: ChangePassword) {
        const password = Validator.validatePassword(doc.oldPassword)
        const newPassword = Validator.validatePassword(doc.newPassword)
        const user: User = await this.UserModel.findOne({
            email: doc.email,
        })
        if (!user) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_USER)
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password)

        if (!isPasswordMatching) {
            throw new BadRequestException(ERROR.INVALID_PASSWORD)
        }

        const hash = await bcrypt.hash(newPassword, 10)

        await this.UserModel.updateOne(
            { email: user.email },
            { password: hash }
        )
    }

    async preForgotPass(doc: PreRegisterDto) {
        const email = Validator.validateEmail(doc.email)
        const user: User = await this.UserModel.findOne({
            email: email,
        })

        if (!user) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_USER)
        }

        const verifyCode = GenerateCode.create({
            length: 4,
            charset: '123456789',
        })

        const id: string = COLLECTION.FOR_GOT_PASS + verifyCode + email

        console.log(verifyCode)
        await Promise.all([
            this.redis.set(id, id, BASE_VALUE.TTL_ACCESS_TOKEN_REDIS),
            this.mailService.sendForgetPass(verifyCode, email),
        ])
    }

    async verifyCodeForgotPass(doc: VerifyDto) {
        const confirmCode = await this.redis.get(
            COLLECTION.FOR_GOT_PASS + doc.code + doc.email
        )

        if (!confirmCode) {
            throw new BadRequestException(ERROR.INVALID_OTP)
        }

        await Promise.all([this.redis.del(confirmCode)])

        return {
            success: true,
        }
    }

    async resetPass(doc: forgotPass) {
        const newPassword = Validator.validatePassword(doc.newPassword)
        const user: User = await this.UserModel.findOne({
            email: doc.email,
        })
        console.log(user)
        if (!user) {
            throw new BadRequestException(ERROR.CAN_NOT_FIND_USER)
        }
        console.log(doc.newPassword)
        const hash = await bcrypt.hash(newPassword, 10)

        await this.UserModel.updateOne(
            { email: user.email },
            { password: hash }
        )
    }
}
