export enum COLLECTION {
    USER = 'users',
    NOTIFICATION = 'NOTIFICATION',
    CAR_COMPANY = 'car_company',
    VEHICLES = 'vehicles',
    VERSION = 'version',
    USER_ADDRESS = 'user_address',
    PRODUCTS = 'products',
    VERIFY_LOGIN = 'verify_login',
    VERIFY_REGISTER = 'verify_register',
    FOR_GOT_PASS = 'for_got_pass',
    FILE = 'file',
    CATEGORY = 'category',
    OPTION = 'option',
    CRAW = 'craw',
    ORDER = 'order',
}

export enum ROLE {
    ADMIN = 'admin',
    NORMAL = 'normal',
    STORE = 'store',
}

export enum ROLE_REGISTER {
    NORMAL = 'normal',
    STORE = 'store',
}

export enum SEX {
    MALE = 'male',
    FEMALE = 'Female',
}
export enum SortType {
    asc = 'asc',
    desc = 'desc',
}

export enum CAR_STATUS {
    OLD = 'OLD',
    NEW = 'NEW',
}

export enum ORIGIN {
    DOMESTIC = 'DOMESTIC',
    IMPORT = 'IMPORT',
}

export enum STATUS {
    IS_BLOCKED = 'IS_BLOCKED',
    PENDING = 'PENDING',
    CANCEL = 'CANCEL',
    APPROVED = 'APPROVED',
    CONFIRMING = 'CONFIRMING',
    DONE = 'DONE',
}

export enum ORDER_STATUS {
    CANCEL = 'CANCEL',
    CONFIRMING = 'CONFIRMING',
    DONE = 'DONE',
}

export enum PAYMENT_STATUS {
    UN_PAID = 'unpaid',
    CHECK_OUT = 'checked_out',
}

export enum NOTIFY_TYPE {
    REVIEW_PRODUCTS = 'REVIEW_PRODUCTS',
    BOOKING = 'order',
    RECEIVE_ORDER = 'receive_orders',
}

export enum ERROR {
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    INVALID_PHONE = 'INVALID_PHONE',
    INVALID_TOKEN = 'INVALID_TOKEN',
    TOKEN_IS_EMPTY = 'TOKEN_IS_EMPTY',
    USER_BLOCKED = 'USER_BLOCKED',
    CAN_NOT_FIND_USER = 'CAN_NOT_FIND_USER',
    CAN_NOT_FIND_CATEGORY = 'CAN_NOT_FIND_CATEGORY',
    CAN_NOT_FIND_VIEWER = 'CAN_NOT_FIND_VIEWER',
    CAN_NOT_FIND_DATA = 'CAN_NOT_FIND_DATA',
    MONGO_ERROR = 'MONGO_ERROR',
    DUPLICATE_TEAM_ID = 'DUPLICATE_TEAM_ID',
    USER_NOT_YET_REGISTERED = 'USER_NOT_YET_REGISTERED',
    LIMIT_RATE = 'LIMIT_RATE',
    ACCESS_DENIED = 'ACCESS_DENIED',
    INVALID_OTP = 'INVALID_OTP',
    ALREADY_ADD = 'ALREADY_ADD',
    BODY_WAS_WRONG = 'BODY_WAS_WRONG',
    DUPLICATE_OWNER_ADDRESS = 'DUPLICATE_OWNER_ADDRESS',
    DUPLICATE_USER = 'DUPLICATE_USER',
    PLEASE_INPUT_STORE_INFO = 'PLEASE_INPUT_STORE_INFO',
    CAN_NOT_FIND_PRODUCT = 'CAN_NOT_FIND_PRODUCT',
    CAN_NOT_CAR_COMPANY = 'CAN_NOT_CAR_COMPANY',
    CAN_NOT_FIND_REVIEW = 'CAN_NOT_FIND_REVIEW',
    SOMETHING_WAS_WRONG = 'SOMETHING_WAS_WRONG',
}

export enum BASE_VALUE {
    TTL_ACCESS_TOKEN_REDIS = 300,
    TTL_TOKEN_REDIS = 24 * 3600 * 2,
    DENOMINATOR = 1000,
    LIMIT_IMAGE_SIZE = 5 * 1024 * 1024,
    LIMIT = 100,
    OFFSET = 0,
}

export enum IndexResource {
    PRODUCT = 'test.products',
    CATEGORY = 'test.categories',
}
