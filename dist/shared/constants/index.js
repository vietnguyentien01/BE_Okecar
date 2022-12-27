"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexResource = exports.BASE_VALUE = exports.ERROR = exports.NOTIFY_TYPE = exports.PAYMENT_STATUS = exports.ORDER_STATUS = exports.STATUS = exports.ORIGIN = exports.CAR_STATUS = exports.SortType = exports.SEX = exports.ROLE_REGISTER = exports.ROLE = exports.COLLECTION = void 0;
var COLLECTION;
(function (COLLECTION) {
    COLLECTION["USER"] = "users";
    COLLECTION["NOTIFICATION"] = "NOTIFICATION";
    COLLECTION["CAR_COMPANY"] = "car_company";
    COLLECTION["VEHICLES"] = "vehicles";
    COLLECTION["VERSION"] = "version";
    COLLECTION["USER_ADDRESS"] = "user_address";
    COLLECTION["PRODUCTS"] = "products";
    COLLECTION["VERIFY_LOGIN"] = "verify_login";
    COLLECTION["VERIFY_REGISTER"] = "verify_register";
    COLLECTION["FOR_GOT_PASS"] = "for_got_pass";
    COLLECTION["FILE"] = "file";
    COLLECTION["CATEGORY"] = "category";
    COLLECTION["OPTION"] = "option";
    COLLECTION["CRAW"] = "craw";
    COLLECTION["ORDER"] = "order";
})(COLLECTION = exports.COLLECTION || (exports.COLLECTION = {}));
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "admin";
    ROLE["NORMAL"] = "normal";
    ROLE["STORE"] = "store";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
var ROLE_REGISTER;
(function (ROLE_REGISTER) {
    ROLE_REGISTER["NORMAL"] = "normal";
    ROLE_REGISTER["STORE"] = "store";
})(ROLE_REGISTER = exports.ROLE_REGISTER || (exports.ROLE_REGISTER = {}));
var SEX;
(function (SEX) {
    SEX["MALE"] = "male";
    SEX["FEMALE"] = "Female";
})(SEX = exports.SEX || (exports.SEX = {}));
var SortType;
(function (SortType) {
    SortType["asc"] = "asc";
    SortType["desc"] = "desc";
})(SortType = exports.SortType || (exports.SortType = {}));
var CAR_STATUS;
(function (CAR_STATUS) {
    CAR_STATUS["OLD"] = "OLD";
    CAR_STATUS["NEW"] = "NEW";
})(CAR_STATUS = exports.CAR_STATUS || (exports.CAR_STATUS = {}));
var ORIGIN;
(function (ORIGIN) {
    ORIGIN["DOMESTIC"] = "DOMESTIC";
    ORIGIN["IMPORT"] = "IMPORT";
})(ORIGIN = exports.ORIGIN || (exports.ORIGIN = {}));
var STATUS;
(function (STATUS) {
    STATUS["IS_BLOCKED"] = "IS_BLOCKED";
    STATUS["PENDING"] = "PENDING";
    STATUS["CANCEL"] = "CANCEL";
    STATUS["APPROVED"] = "APPROVED";
    STATUS["CONFIRMING"] = "CONFIRMING";
    STATUS["DONE"] = "DONE";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["CANCEL"] = "CANCEL";
    ORDER_STATUS["CONFIRMING"] = "CONFIRMING";
    ORDER_STATUS["DONE"] = "DONE";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var PAYMENT_STATUS;
(function (PAYMENT_STATUS) {
    PAYMENT_STATUS["UN_PAID"] = "unpaid";
    PAYMENT_STATUS["CHECK_OUT"] = "checked_out";
})(PAYMENT_STATUS = exports.PAYMENT_STATUS || (exports.PAYMENT_STATUS = {}));
var NOTIFY_TYPE;
(function (NOTIFY_TYPE) {
    NOTIFY_TYPE["REVIEW_PRODUCTS"] = "REVIEW_PRODUCTS";
    NOTIFY_TYPE["BOOKING"] = "order";
    NOTIFY_TYPE["RECEIVE_ORDER"] = "receive_orders";
})(NOTIFY_TYPE = exports.NOTIFY_TYPE || (exports.NOTIFY_TYPE = {}));
var ERROR;
(function (ERROR) {
    ERROR["INVALID_PASSWORD"] = "INVALID_PASSWORD";
    ERROR["INVALID_PHONE"] = "INVALID_PHONE";
    ERROR["INVALID_TOKEN"] = "INVALID_TOKEN";
    ERROR["TOKEN_IS_EMPTY"] = "TOKEN_IS_EMPTY";
    ERROR["USER_BLOCKED"] = "USER_BLOCKED";
    ERROR["CAN_NOT_FIND_USER"] = "CAN_NOT_FIND_USER";
    ERROR["CAN_NOT_FIND_CATEGORY"] = "CAN_NOT_FIND_CATEGORY";
    ERROR["CAN_NOT_FIND_VIEWER"] = "CAN_NOT_FIND_VIEWER";
    ERROR["CAN_NOT_FIND_DATA"] = "CAN_NOT_FIND_DATA";
    ERROR["MONGO_ERROR"] = "MONGO_ERROR";
    ERROR["DUPLICATE_TEAM_ID"] = "DUPLICATE_TEAM_ID";
    ERROR["USER_NOT_YET_REGISTERED"] = "USER_NOT_YET_REGISTERED";
    ERROR["LIMIT_RATE"] = "LIMIT_RATE";
    ERROR["ACCESS_DENIED"] = "ACCESS_DENIED";
    ERROR["INVALID_OTP"] = "INVALID_OTP";
    ERROR["ALREADY_ADD"] = "ALREADY_ADD";
    ERROR["BODY_WAS_WRONG"] = "BODY_WAS_WRONG";
    ERROR["DUPLICATE_OWNER_ADDRESS"] = "DUPLICATE_OWNER_ADDRESS";
    ERROR["DUPLICATE_USER"] = "DUPLICATE_USER";
    ERROR["PLEASE_INPUT_STORE_INFO"] = "PLEASE_INPUT_STORE_INFO";
    ERROR["CAN_NOT_FIND_PRODUCT"] = "CAN_NOT_FIND_PRODUCT";
    ERROR["CAN_NOT_CAR_COMPANY"] = "CAN_NOT_CAR_COMPANY";
    ERROR["CAN_NOT_FIND_REVIEW"] = "CAN_NOT_FIND_REVIEW";
    ERROR["SOMETHING_WAS_WRONG"] = "SOMETHING_WAS_WRONG";
})(ERROR = exports.ERROR || (exports.ERROR = {}));
var BASE_VALUE;
(function (BASE_VALUE) {
    BASE_VALUE[BASE_VALUE["TTL_ACCESS_TOKEN_REDIS"] = 300] = "TTL_ACCESS_TOKEN_REDIS";
    BASE_VALUE[BASE_VALUE["TTL_TOKEN_REDIS"] = 172800] = "TTL_TOKEN_REDIS";
    BASE_VALUE[BASE_VALUE["DENOMINATOR"] = 1000] = "DENOMINATOR";
    BASE_VALUE[BASE_VALUE["LIMIT_IMAGE_SIZE"] = 5242880] = "LIMIT_IMAGE_SIZE";
    BASE_VALUE[BASE_VALUE["LIMIT"] = 100] = "LIMIT";
    BASE_VALUE[BASE_VALUE["OFFSET"] = 0] = "OFFSET";
})(BASE_VALUE = exports.BASE_VALUE || (exports.BASE_VALUE = {}));
var IndexResource;
(function (IndexResource) {
    IndexResource["PRODUCT"] = "test.products";
    IndexResource["CATEGORY"] = "test.categories";
})(IndexResource = exports.IndexResource || (exports.IndexResource = {}));
//# sourceMappingURL=index.js.map