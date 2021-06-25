import { Tasks } from "../store/Types/TaskType";
import { User } from "../store/Types/UserType";

export interface Value {
    username: string;
    password: string;
}

export const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
export const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

export const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

export const checkTaskList = (tasks: Tasks[], taskName: string) => {
    let check = false;
    tasks?.map((item: Tasks) => {
        if (item.taskName === taskName) {
            check = true;
        }
        return check;
    });
    return check;
};

export const handleLogin = (user: User[], value: Value) => {
    let check = false;
    user?.map((item: User) => {
        if (item.userName === value.username && item.passWord === value.password) {
            check = true;
        }
        return check;
    });
    return check;
};
