import { Action } from "redux"
import {
    ADD_USER_FAILURE,
    ADD_USER_SUCCESS,
    CHECK_LOGIN_SUCCESS,
    CHECK_LOGOUT_SUCCESS,
    CLOSE_LOADING,
    GET_ALL_DATA_USER_FAILURE,
    GET_ALL_DATA_USER_SUCCESS,
    OPEN_LOADING,
} from "../../utils/TypeConstant"
import { InitialStateUser, UserActionType } from "../Types/UserType"

export interface DispatchAction extends Action {
    payload: Partial<InitialStateUser>
}

const initialState: InitialStateUser = {
    user: [],
    isLoading: false,
    error: false,
    message: "",
    isLogin: false,
}

export const UserReducer = (state = initialState, action: UserActionType) => {
    switch (action.type) {
        case OPEN_LOADING: {
            return { ...state, isLoading: true }
        }

        case CLOSE_LOADING: {
            return { ...state, isLoading: false }
        }
        case GET_ALL_DATA_USER_SUCCESS: {
            const arrData = action.payload
            return { ...state, user: arrData }
        }

        case GET_ALL_DATA_USER_FAILURE: {
            return { ...state, error: true, message: action.payload.message }
        }

        case ADD_USER_SUCCESS: {
            return { ...state, user: [...state.user, action.payload] }
        }

        case ADD_USER_FAILURE: {
            console.log("ADD_USER_FAILURE: ", action.payload.message)
            return { ...state, error: true, message: action.payload.message }
        }

        case CHECK_LOGIN_SUCCESS: {
            // return { ...state, action.payload }
            const newArr = [...state.user]
            const index = newArr.findIndex(
                item => item.id === action.payload.id,
            )
            if (index !== -1) {
                state.user[index] = action.payload
            }

            return { ...state, isLogin: true }
        }

        case CHECK_LOGOUT_SUCCESS: {
            const newArr = [...state.user]
            const index = newArr.findIndex(
                item => item.id === action.payload.id,
            )
            if (index !== -1) {
                state.user[index] = action.payload
            }
            console.log("bbb", action.payload)
            return { ...state, isLogin: false }
        }

        default:
            return { ...state }
    }
}
