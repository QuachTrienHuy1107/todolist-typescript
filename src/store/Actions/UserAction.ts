import { ADD_USER, CHECK_LOGIN, CHECK_LOGOUT, GET_ALL_DATA_USER } from "../../utils/TypeConstant";
import { User } from "../Types/UserType";

export const getAllUserAction = () => ({
        type: GET_ALL_DATA_USER,
    });

export const registerAction = (data: User) => ({
        type: ADD_USER,
        payload: data,
    });

export const handleLoginAction = (data: User) => ({
        type: CHECK_LOGIN,
        payload: data,
    });
export const handleLogoutAction = (user: {id:number, isLogin: boolean}) => ({
        type: CHECK_LOGOUT,
        payload: user
    });
