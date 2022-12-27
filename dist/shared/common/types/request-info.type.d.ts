import { User } from '../../../apis/users/model/user.schema';
declare class Header {
    authorization?: string;
}
export declare class RequestInfoType {
    user: User;
    headers?: Header;
}
export {};
