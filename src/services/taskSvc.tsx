import { Tasks } from "../store/Types/TaskType";
import axiosClient from "./axiosClient";

const taskApi = {
    getAll: () => {
        const url = "/todolist";
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getTaskWithPagination: (page: number) => {
        const url = `/todolist?_page=${page}&_limit=3`;
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    addTask: (todo: Tasks) => {
        const url = `/todolist`;
        return axiosClient
            .post(url, todo)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    deleteTasks: (todo: Tasks) => {
        const url = `/todolist/${todo.id}`;
        return axiosClient
            .delete(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    updateTasks: (oldTodo: Tasks, payload: Tasks) => {
        const url = `/todolist/${oldTodo.id}`;
        return axiosClient
            .put(url, payload)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    searchTaskList: (data: string) => {
        const url = `/todolist?q=${data}`;
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    checkDoneTask: (id: Tasks, payload: Tasks) => {
        const url = `/todolist/${id.id}`;
        return axiosClient
            .put(url, payload)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default taskApi;
