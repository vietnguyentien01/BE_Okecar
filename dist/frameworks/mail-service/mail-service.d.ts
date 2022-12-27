import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailService;
    constructor(mailService: MailerService);
    sendStaffEmail(verifyCode: string, email: string, role: string): Promise<void>;
    sendRegisterOTP(verifyCode: string, email: string): Promise<void>;
    sendForgetPass(verifyCode: string, email: string): Promise<void>;
    sendNewOrder(): Promise<void>;
}
