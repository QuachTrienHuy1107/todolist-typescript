import * as Effect from "redux-saga/effects"
import { call, delay, put, takeEvery } from "redux-saga/effects"
import userApi from "../services/userSvc"
import { AddNewUser, CheckLoginType, CheckLogoutType } from "../store/Types/UserType"
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
    OPEN_LOADING,
} from "../utils/TypeConstant"

interface ResponseTypes {
    status: number
}

function* getDataUser() {
    try {
        const { response, error } = yield call(userApi.getAll)
        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: GET_ALL_DATA_USER_SUCCESS,
                payload: response.data,
            }
            yield put(action)
        } else {
            console.log("error", error)
            throw new Error("Network Error")
        }
    } catch (e) {
        yield put({
            type: GET_ALL_DATA_USER_FAILURE,
            payload: { message: e.message },
        })
    }
}

function* addUser({ payload }: AddNewUser) {
    try {
        const { response, error } = yield call(userApi.addUser, payload)

        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: ADD_USER_SUCCESS,
                payload: response.data,
            }
            yield put(action)
        } else {
            console.log("error", error)
            throw new Error("Failed")
        }
    } catch (e) {
        console.log("object", e)
        console.log("aaaaa", Error)
        yield put({
            type: ADD_USER_FAILURE,
            payload: { message: e.message },
        })
    }
}

function* checkLogin({ payload }: CheckLoginType) {
    try {
        const { response, error } = yield call(userApi.checkLogin, payload)
        yield put({ type: OPEN_LOADING })
        // yield delay(1000)
        if (response?.status >= 200 && response?.status < 300) {

            const action = {
                type: CHECK_LOGIN_SUCCESS,
                payload,
            }
            yield put(action)
        } else {
            throw new Error("Failed")
        }

        /* yield localStorage.setItem('user',JSON.stringify(payload))
        console.log('asd',payload) */
        yield put({ type: CLOSE_LOADING })
    } catch (e) {
        yield put({
            type: CHECK_LOGIN_FAILURE,
            payload: { message: e.message },
        })
    }
}

function* checkLogout({ payload }: CheckLogoutType) {
    try {
      const { response, error } = yield call(userApi.checkLogout, payload)
      if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: CHECK_LOGOUT_SUCCESS,
                payload: response.data,
            }
            console.log('response',response)
            yield put(action)
      }
        yield put({ type: CLOSE_LOADING })
    } catch (e) {
        yield put({
            type: CHECK_LOGOUT_FAILURE,
            payload: { message: e.message },
        })
    }
}

function* watchOnLyrics() {
    yield takeEvery(GET_ALL_DATA_USER, getDataUser)
    yield takeEvery(ADD_USER, addUser)
    yield takeEvery(CHECK_LOGIN, checkLogin)
    yield takeEvery(CHECK_LOGOUT, checkLogout)
}

function* UserSaga() {
    yield Effect.all([Effect.fork(watchOnLyrics)])
}

export default UserSaga
