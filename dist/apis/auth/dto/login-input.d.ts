export declare class LoginDto {
    userName: string;
    password: string;
}
export declare class StaffLoginDto {
    email: string;
}
export declare class PreRegisterDto {
    email: string;
}
export declare class VerifyStaffLoginDto {
    email: string;
    code: string;
}
export declare class VerifyDto {
    email: string;
    code: number;
}
export declare class ChangePassword {
    email: string;
    oldPassword: string;
    newPassword: string;
}
export declare class forgotPass {
    email: string;
    newPassword: string;
}
