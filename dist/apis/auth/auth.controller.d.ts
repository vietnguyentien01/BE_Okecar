import { AuthService } from './auth.service';
import { ChangePassword, forgotPass, LoginDto, PreRegisterDto, VerifyDto } from './dto';
import { RegisterInput } from './dto/register-input';
import { LoginVerifyResponseEntity } from './entities/login-response.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(doc: RegisterInput): Promise<LoginVerifyResponseEntity>;
    logout(ctx: any): Promise<void>;
    preRegister(doc: PreRegisterDto): Promise<void>;
    confirmOTP(doc: VerifyDto): Promise<void>;
    login(doc: LoginDto): Promise<LoginVerifyResponseEntity>;
    changePass(doc: ChangePassword): Promise<void>;
    preForgotPass(doc: PreRegisterDto): Promise<void>;
    confirmOTPForGet(doc: VerifyDto): Promise<void>;
    resetPass(doc: forgotPass): Promise<void>;
}
