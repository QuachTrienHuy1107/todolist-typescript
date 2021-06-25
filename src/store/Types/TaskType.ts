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
    MessageError,
    SEARCH_TASK,
    SEARCH_TASK_FAILURE,
    SEARCH_TASK_SUCCESSS,
} from "../../utils/TypeConstant";

export interface Tasks {
    taskName: string;
    date: string;
    isDone: boolean;
    id?: number | undefined;
}

export interface TaskState {
    tasks: Tasks[];
    error: boolean;
    message: string;
    isDone: boolean;
}

export interface GetAllTaskType {
    type: typeof GET_ALL_TASK;
    payload: Tasks[];
}

export interface GetAllTaskSuccessType {
    type: typeof GET_ALL_TASK_SUCCESS;
    payload: { tasks: Tasks[] };
}
export interface GetAllTaskFailureType {
    type: typeof GET_ALL_TASK_FAILURE;
    payload: MessageError;
}

export interface GetDataPagination {
    type: typeof GET_DATA_PAGINATION;
    payload: number;
}

export interface GetDataPaginationSuccessType {
    type: typeof GET_DATA_PAGINATION_SUCCESS;
    payload: { taskList: Tasks[] };
}

export interface GetDataPaginationFailureType {
    type: typeof GET_DATA_PAGINATION_FAILURE;
    payload: MessageError;
}

export interface AddTask {
    type: typeof ADD_TASK;
    payload: Tasks;
}

export interface AddTaskSuccess {
    type: typeof ADD_TASK_SUCCESS;
    payload: { tasks: Array<Tasks> };
}
export interface AddTaskFailure {
    type: typeof ADD_TASK_FAILURE;
    payload: MessageError;
}

export interface DeleteTaskType {
    type: typeof DELETE_TASK;
    payload: Tasks;
}

export interface DeleteTaskTypeSuccess {
    type: typeof DELETE_TASK_SUCCESS;
    payload: Tasks;
}

export interface DeleteTaskTypeFailure {
    type: typeof DELETE_TASK_FAILURE;
    payload: MessageError;
}

export interface UpdateTaskType {
    type: typeof EDIT_TASK;
    payload: Tasks;
    oldTodo: Tasks;
}

export interface UpdateTaskTypeSuccess {
    type: typeof EDIT_TASK_SUCCESS;
    payload: Tasks;
}

export interface UpdateTaskTypeFailure {
    type: typeof EDIT_TASK_FAILURE;
    payload: MessageError;
}

export interface SearchTaskType {
    type: typeof SEARCH_TASK;
    payload: string;
}

export interface SearchTaskTypeSuccess {
    type: typeof SEARCH_TASK_SUCCESSS;
    payload: { tasks: Array<Tasks> };
}

export interface SearchTaskTypeFailure {
    type: typeof SEARCH_TASK_FAILURE;
    payload: MessageError;
}

export interface CheckDoneType {
    type: typeof CHECK_DONE;
    payload: Tasks;
    id: Tasks;
}

export interface CheckDoneTypeSuccess {
    type: typeof CHECK_DONE_SUCCESS;
    payload: Tasks;
}

export interface CheckDoneTypeFailure {
    type: typeof CHECK_DONE_FAILURE;
    payload: MessageError;
}

export type TodoActionTypes =
    | GetAllTaskType
    | GetAllTaskSuccessType
    | GetAllTaskFailureType
    | GetDataPagination
    | GetDataPaginationSuccessType
    | GetDataPaginationFailureType
    | AddTask
    | AddTaskSuccess
    | AddTaskFailure
    | DeleteTaskType
    | DeleteTaskTypeSuccess
    | DeleteTaskTypeFailure
    | UpdateTaskType
    | UpdateTaskTypeSuccess
    | UpdateTaskTypeFailure
    | SearchTaskType
    | SearchTaskTypeSuccess
    | SearchTaskTypeFailure
    | CheckDoneType
    | CheckDoneTypeSuccess
    | CheckDoneTypeFailure;
