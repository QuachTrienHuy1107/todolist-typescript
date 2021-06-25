import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { useTypedSelector } from "../../store";
import {
    getAllUserAction,
    registerAction,
} from "../../store/Actions/UserAction";
import {
    layout,
    onFinishFailed,
    tailLayout,
    Value,
} from "../../utils/constants";
import { User } from "../../store/Types/UserType";
import "./style.scss";

/* type Func = (user: User, value:Value) => typeof user

declare const fn: Func */

const Register: React.FC<Record<string, never>> = props => {
    const dispatch = useDispatch();
    const { user, error } = useTypedSelector(state => state.UserReducer);
    const history = useHistory();

    React.useEffect(() => {
        dispatch(getAllUserAction());
    }, [dispatch]);

    const handleLogin = (users: User[], value: Value) => {
        let check = true;
        users?.map((item: User) => {
            if (item.userName === value.username) {
                check = false;
            }
            return check;
        });
        return check;
    };

    const onFinish = async (values: Value) => {
        console.log("Received values of form: ", values);
        const action: User = {
            userName: values.username,
            passWord: values.password,
            isLogin: false,
        };

        if (handleLogin(user, values)) {
            dispatch(registerAction(action));
            if (!error) {
                alert("Success!!");
                history.push("/login");
            }
        } else {
            alert("That username is taken. Try another!!");
        }
    };

    return (
        <>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <div className="login-form">
                    <div className="login-form__item">
                        <div className="login-form__item__info">
                            <h1>Signup</h1>
                            <Form.Item
                                {...tailLayout}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username!",
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
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                {...tailLayout}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
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
                                name="confirm"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    "The two passwords that you entered do not match!",
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="confirm"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>

                            <Form.Item {...tailLayout} className="text-center ">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form__item__info__btnSignup w-50 "
                                >
                                    Sign up
                                </Button>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <div className="text-center">
                                    <p>
                                        <i className="fa fa-arrow-left" />
                                        <Link
                                            to="/login"
                                            className="text-light ml-2"
                                        >
                                            Back to your signin
                                        </Link>
                                    </p>
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default Register;
