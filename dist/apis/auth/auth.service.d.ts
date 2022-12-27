import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CacheService } from '../../frameworks/cache-service/cache.service';
import { MailService } from '../../frameworks/mail-service/mail-service';
import { User } from '../users/model/user.schema';
import { ChangePassword, forgotPass, LoginDto, PreRegisterDto, VerifyDto } from './dto';
import { RegisterInput } from './dto/register-input';
import { ILoginResponse } from './entities/login-response.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly redis;
    private readonly mailService;
    private readonly UserModel;
    constructor(jwtService: JwtService, redis: CacheService, mailService: MailService, UserModel: Model<User>);
    register(doc: RegisterInput): Promise<ILoginResponse>;
    login(doc: LoginDto): Promise<ILoginResponse>;
    logout(token: string): Promise<void>;
    preRegister(doc: PreRegisterDto): Promise<void>;
    verifyCodeRegister(doc: VerifyDto): Promise<{
        success: boolean;
    }>;
    changePassWord(doc: ChangePassword): Promise<void>;
    preForgotPass(doc: PreRegisterDto): Promise<void>;
    verifyCodeForgotPass(doc: VerifyDto): Promise<{
        success: boolean;
    }>;
    resetPass(doc: forgotPass): Promise<void>;
}
