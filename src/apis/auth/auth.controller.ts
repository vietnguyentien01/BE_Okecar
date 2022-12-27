import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import {
    ChangePassword,
    forgotPass,
    LoginDto,
    PreRegisterDto,
    VerifyDto,
} from './dto'
import { RegisterInput } from './dto/register-input'
import { LoginVerifyResponseEntity } from './entities/login-response.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('/confirm-register')
    async register(
        @Body() doc: RegisterInput
    ): Promise<LoginVerifyResponseEntity> {
        const result = await this.authService.register(doc)
        return new LoginVerifyResponseEntity(result)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Request() ctx) {
        await this.authService.logout(ctx.headers.authorization)
    }

    @Post('/pre-register')
    @HttpCode(HttpStatus.NO_CONTENT)
    async preRegister(@Body() doc: PreRegisterDto) {
        await this.authService.preRegister(doc)
    }

    @Post('/verify-otp')
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmOTP(@Body() doc: VerifyDto) {
        await this.authService.verifyCodeRegister(doc)
    }

    @Post('/login')
    async login(@Body() doc: LoginDto): Promise<LoginVerifyResponseEntity> {
        const result = await this.authService.login(doc)
        return new LoginVerifyResponseEntity(result)
    }

    @Post('/change-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async changePass(@Body() doc: ChangePassword) {
        await this.authService.changePassWord(doc)
    }

    @Post('/pre-forgot-pass')
    @HttpCode(HttpStatus.NO_CONTENT)
    async preForgotPass(@Body() doc: PreRegisterDto) {
        await this.authService.preForgotPass(doc)
    }

    @Post('/verify-otp-forget')
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmOTPForGet(@Body() doc: VerifyDto) {
        await this.authService.verifyCodeForgotPass(doc)
    }

    @Post('/reset-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async resetPass(@Body() doc: forgotPass) {
        await this.authService.resetPass(doc)
    }
}
