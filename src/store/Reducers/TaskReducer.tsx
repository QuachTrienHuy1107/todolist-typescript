import { Action } from "redux";
import {
    ADD_TASK_FAILURE,
    ADD_TASK_SUCCESS,
    CHECK_DONE_FAILURE,
    CHECK_DONE_SUCCESS,
    DELETE_TASK_FAILURE,
    DELETE_TASK_SUCCESS,
    EDIT_TASK_FAILURE,
    EDIT_TASK_SUCCESS,
    GET_ALL_TASK_SUCCESS,
    GET_DATA_PAGINATION_FAILURE,
    GET_DATA_PAGINATION_SUCCESS,
    SEARCH_TASK_FAILURE,
    SEARCH_TASK_SUCCESSS,
} from "../../utils/TypeConstant";
import { Tasks, TaskState, TodoActionTypes } from "../Types/TaskType";

export interface DispatchAction extends Action {
    payload: Partial<Tasks>;
}

const initialState: TaskState = {
    tasks: [],
    error: false,
    message: "",
    isDone: true,
};

export const TaskReducer = (state = initialState, action: TodoActionTypes) => {
    switch (action.type) {
        case GET_ALL_TASK_SUCCESS: {
            return { ...state, tasks: action.payload };
        }

        case GET_DATA_PAGINATION_SUCCESS: {
            return { ...state, tasks: action.payload };
        }

        case GET_DATA_PAGINATION_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        case ADD_TASK_SUCCESS: {
            return { tasks: [...state.tasks, action.payload] };
        }

        case ADD_TASK_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        case DELETE_TASK_SUCCESS: {
            console.log("object", action.payload);
            let newArr = [...state.tasks];
            newArr = newArr.filter(item => item.id !== action.payload.id);
            state.tasks = newArr;
            return { ...state.tasks, tasks: newArr };
        }

        case DELETE_TASK_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        case EDIT_TASK_SUCCESS: {
            const index = state.tasks.findIndex(
                item => item.id === action.payload.id,
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
            return { ...state };
        }

        case EDIT_TASK_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        case SEARCH_TASK_SUCCESSS: {
            return { ...state, tasks: action.payload };
        }

        case SEARCH_TASK_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        case CHECK_DONE_SUCCESS: {
            const index = state.tasks.findIndex(
                item => item.id === action.payload.id,
            );
            if (index !== -1) {
                state.tasks[index].isDone = action.payload.isDone;
            }
            return { ...state, ...state.tasks };
        }

        case CHECK_DONE_FAILURE: {
            return { ...state, error: true, message: action.payload.message };
        }

        default:
            return { ...state };
    }
};
