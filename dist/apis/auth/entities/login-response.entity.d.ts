import { IUser } from '../../../interfaces/user.interface';
export interface ILoginResponse {
    user: IUser;
    access_token: string;
}
export interface LoginVerifyResponseEntity extends ILoginResponse {
}
export declare class LoginVerifyResponseEntity {
    constructor(partial: Partial<ILoginResponse>);
}
export interface IMemberLogin {
    verifyCode: string;
}
