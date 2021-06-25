import { ADD_TASK, DELETE_TASK, GET_DATA_PAGINATION , CHECK_DONE, EDIT_TASK, GET_ALL_TASK, SEARCH_TASK } from "../../utils/TypeConstant";
import { Tasks } from "../Types/TaskType";


export const getAllTaskAction = () => ({
        type: GET_ALL_TASK,
    });

export const checkDoneAction = (id: Tasks, isDone: Tasks) => ({
        type: CHECK_DONE,
        payload: isDone,
        id,
    });

export const getTaskWithPaginationAction = (page: number) => ({
        type: GET_DATA_PAGINATION,
        payload: page,
    });

export const addTaskListAction = (data: Tasks) => ({
        type: ADD_TASK,
        payload: data,
    });

export const deleteTaskAction = (todo: Tasks) => ({
        type: DELETE_TASK,
        payload: todo,
    });
export const updateTaskAction = (oldTodo: Tasks, todo: Tasks) => ({
        type: EDIT_TASK,
        payload: todo,
        oldTodo,
    });

export const searchTaskAction = (data: string) => ({
        type: SEARCH_TASK,
        payload: data,
    });
