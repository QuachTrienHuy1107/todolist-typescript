import {
    ADD_USER,
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    CHECK_LOGIN,
    CHECK_LOGIN_FAILURE,
    CHECK_LOGIN_SUCCESS,
    CHECK_LOGOUT,
    CHECK_LOGOUT_FAILURE,
    CHECK_LOGOUT_SUCCESS,
    CLOSE_LOADING,
    GET_ALL_DATA_USER,
    GET_ALL_DATA_USER_FAILURE,
    GET_ALL_DATA_USER_SUCCESS,
    MessageError,
    OPEN_LOADING,
} from "../../utils/TypeConstant";

export interface User {
    userName: string;
    passWord: string;
    isLogin?: boolean;
    id?: number;
}

export interface InitialStateUser {
    user: User[];
    error: boolean;
    isLoading: boolean;
    message: string;
    isLogin: boolean;
}

export interface CheckLoginTypeLoading {
    type: typeof OPEN_LOADING;
}

export interface CheckLogoutLoadingType {
    type: typeof CLOSE_LOADING;
}

export interface GetAllDataUser {
    type: typeof GET_ALL_DATA_USER;
    payload: User[];
}

export interface GetAllDataUserSuccess {
    type: typeof GET_ALL_DATA_USER_SUCCESS;
    payload: { user: User[] };
}
export interface GetAllDataUserFAILURE {
    type: typeof GET_ALL_DATA_USER_FAILURE;
    payload: MessageError;
}
export interface AddNewUser {
    type: typeof ADD_USER;
    payload: User;
}

export interface AddNewUserSuccess {
    type: typeof ADD_USER_SUCCESS;
    payload: User;
}

export interface AddNewUserFAILURE {
    type: typeof ADD_USER_FAILURE;
    payload: MessageError;
}

export interface CheckLoginType {
    type: typeof CHECK_LOGIN;
    payload: User;
}

export interface CheckLoginTypeSuccess {
    type: typeof CHECK_LOGIN_SUCCESS;
    payload: User;
}
export interface CheckLoginTypeFailure {
    type: typeof CHECK_LOGIN_FAILURE;
    payload: MessageError;
}
export interface CheckLogoutType {
    type: typeof CHECK_LOGOUT;
    payload: User;
}

export interface CheckLogoutTypeSuccess {
    type: typeof CHECK_LOGOUT_SUCCESS;
    payload: User;
}
export interface CheckLogoutTypeFAILURE {
    type: typeof CHECK_LOGOUT_FAILURE;
    payload: MessageError;
}

export type UserActionType =
    | GetAllDataUser
    | CheckLoginTypeLoading
    | GetAllDataUserSuccess
    | GetAllDataUserFAILURE
    | AddNewUser
    | AddNewUserSuccess
    | AddNewUserFAILURE
    | CheckLoginType
    | CheckLogoutLoadingType
    | CheckLoginTypeSuccess
    | CheckLoginTypeFailure
    | CheckLogoutTypeSuccess;
