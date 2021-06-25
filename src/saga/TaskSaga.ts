import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import taskApi from '../services/taskSvc';
import {AddTask, CheckDoneType, DeleteTaskType, GetDataPagination, SearchTaskType, UpdateTaskType } from '../store/Types/TaskType';
import {
    ADD_TASK,
    ADD_TASK_FAILURE,
    ADD_TASK_SUCCESS,
    CHECK_DONE,
    CHECK_DONE_FAILURE,
    CHECK_DONE_SUCCESS,
    DELETE_TASK,
    DELETE_TASK_FAILURE,
    DELETE_TASK_SUCCESS,
    EDIT_TASK,
    EDIT_TASK_FAILURE,
    EDIT_TASK_SUCCESS,
    GET_ALL_TASK,
    GET_ALL_TASK_FAILURE,
    GET_ALL_TASK_SUCCESS,
    GET_DATA_PAGINATION,
    GET_DATA_PAGINATION_FAILURE,
    GET_DATA_PAGINATION_SUCCESS,
    SEARCH_TASK,
    SEARCH_TASK_FAILURE,
    SEARCH_TASK_SUCCESSS,
} from '../utils/TypeConstant';

// Worker
function* getAllTask() {
    try {
        const { response } = yield call(taskApi.getAll);
        if (response.status >= 200 && response.status < 300) {
            const action = {
                type: GET_ALL_TASK_SUCCESS,
                payload: response.data,
            };
            yield put(action);
        } else {
            console.log({ response });
            throw response;
        }
    } catch (err) {
        yield put({ type: GET_ALL_TASK_FAILURE, payload: { error: err, message: err.statusText } });
    }
}

function* getTasksListPagination({ payload }: GetDataPagination) {
    try {
        const { response, error } = yield call(taskApi.getTaskWithPagination, payload);
        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: GET_DATA_PAGINATION_SUCCESS,
                payload: response.data,
            };
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: GET_DATA_PAGINATION_FAILURE,
            payload: { message: e.message },
        });
    }
}

function* addTaskList({ payload }: AddTask) {
    try {
        const { response, error } = yield call(taskApi.addTask, payload);
        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: ADD_TASK_SUCCESS,
                payload: response.data,
            };
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: ADD_TASK_FAILURE,
            payload: { message: e.message },
        });
    }
}

function* removeTask({ payload }: DeleteTaskType) {
    try {
        const { response, error } = yield call(taskApi.deleteTasks, payload);
        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: DELETE_TASK_SUCCESS,
                payload,
            };
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: DELETE_TASK_FAILURE,
            payload: { message: e.message },
        });
    }
}

function* updateTask({ oldTodo, payload }: UpdateTaskType) {
    try {
        const { response, error } = yield call(taskApi.updateTasks, oldTodo, payload);
        if (response.status >= 200 && response.status < 300) {
            const action = {
                type: EDIT_TASK_SUCCESS,
                payload: response.data,
            };
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: EDIT_TASK_FAILURE,
            payload: { message: e.message },
        });
    }
}

function* searchTask({ payload }: SearchTaskType) {
    try {
        const { response, error } = yield call(taskApi.searchTaskList, payload);
        if (response.status >= 200 && response.status < 300) {
            const action = {
                type: SEARCH_TASK_SUCCESSS,
                payload: response.data,
            };
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: SEARCH_TASK_FAILURE,
            payload: { message: e.message },
        });
    }
}

function* checkDone({ id, payload }: CheckDoneType) {
    try {
        const { response, error } = yield call(taskApi.checkDoneTask, id, payload);
        if (response?.status >= 200 && response?.status < 300) {
            const action = {
                type: CHECK_DONE_SUCCESS,
                payload: response?.data,
            };
            console.log('payload', payload);
            console.log('action', action);
            yield put(action);
        } else {
            console.log('error', error);
            throw new Error('Network Error');
        }
    } catch (e) {
        yield put({
            type: CHECK_DONE_FAILURE,
            payload: { message: e.message },
        });
    }
}

// Watcher
function* watchOnLyrics() {
    yield takeEvery(GET_DATA_PAGINATION, getTasksListPagination);
    yield takeEvery(ADD_TASK, addTaskList);
    yield takeEvery(DELETE_TASK, removeTask);
    yield takeEvery(EDIT_TASK, updateTask);
    yield takeEvery(SEARCH_TASK, searchTask);
    yield takeEvery(GET_ALL_TASK, getAllTask);
    yield takeEvery(CHECK_DONE, checkDone);
}

function* TasksSaga() {
    yield all([fork(watchOnLyrics)]);
}

export default TasksSaga;
