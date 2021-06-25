import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

import Loading from "../../components/Loading";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useTypedSelector } from "../../store";
import {
    getAllUserAction,
    handleLoginAction,
} from "../../store/Actions/UserAction";
import { User } from "../../store/Types/UserType";
import {
    handleLogin,
    layout,
    onFinishFailed,
    tailLayout,
    Value,
} from "../../utils/constants";
import "./style.scss";

const Login: React.FC<Record<string, never>> = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, isLogin, error, isLoading } = useTypedSelector(
        state => state.UserReducer,
    );
    const [getUser, setUser] = useLocalStorage("user", {});

    React.useEffect(() => {
        dispatch(getAllUserAction());
    }, [dispatch]);

    const onFinish = (values: Value) => {
        const newArr: User[] = [...user];
        const index = newArr.find(item => item.userName === values.username);
        if (index) {
            const action: User = {
                userName: values.username,
                passWord: values.password,
                id: index.id,
                isLogin: true,
            };
            dispatch(handleLoginAction(action));
            setUser(action);
        } else {
            alert(
                "Wrong password. Try again or click Forgot password to reset it.!!",
            );
        }
    };

    if (isLogin && isLoading && getUser) {
        swal("Success!!", {
            icon: "success",
        });

        history.push("/");
    }

    return (
        <>
            {isLoading ? <Loading /> : ""}
            <div className="login">
                <div className="login__wrapper">
                    <div className="login__inner">
                        <div className="login__inner__container">
                            <div className="login__inner__container--content">
                                {error ? (
                                    <div className="netWorkError">
                                        <h1 className="mb-2">
                                            Something went wrong
                                        </h1>
                                        <p>
                                            Sorry, something went wrong there.
                                            Try again.
                                        </p>
                                    </div>
                                ) : (
                                    <Form
                                        {...layout}
                                        name="basic"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <h1>Login</h1>
                                        <Form.Item
                                            {...tailLayout}
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your Username!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <UserOutlined className="site-form-item-icon" />
                                                }
                                                placeholder="Username"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...tailLayout}
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input your Password!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <LockOutlined className="site-form-item-icon" />
                                                }
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...tailLayout}
                                            name="remember"
                                            valuePropName="checked"
                                        >
                                            <Checkbox>
                                                <p>Remember me ?</p>
                                            </Checkbox>
                                            <Tooltip title="Useful information">
                                                <a
                                                    href="#API"
                                                    style={{ margin: "0 8px" }}
                                                >
                                                    Forgot Password?
                                                </a>
                                            </Tooltip>
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="w-100 rounded"
                                            >
                                                Log in
                                            </Button>
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <p>Don't have a account? </p>{" "}
                                            <Link to="/register">Sign up</Link>
                                        </Form.Item>
                                    </Form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
