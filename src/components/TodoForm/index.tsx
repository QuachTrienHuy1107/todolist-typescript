import React, { FormEvent } from "react"
import { Card, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import swal from "sweetalert"
import useLocalStorage from "../../hooks/useLocalStorage"

import { useTypedSelector } from "../../store"
import { getTaskWithPaginationAction } from "../../store/Actions/TaskAction"
import { handleLogoutAction } from "../../store/Actions/UserAction"
import { User } from "../../store/Types/UserType"
import AddTaskTodo from "../AddTaskTodo"
import SearchForm from "../SearchForm"
import TodoList from "../TodoList"
import "./style.scss"

const GetUserType: User = {
    isLogin: true,
    id: 1,
    userName: "",
    passWord: "",
}

const TodoForm: React.FC<Record<string, never>> = props => {
    const [filter, setFilter] = React.useState(1)
    const history = useHistory()
    const dispatch = useDispatch()
    const { tasks, error } = useTypedSelector(state => state.TaskReducer)
    const [getUser, setUser] = useLocalStorage("user", {})
    console.log("getUser", getUser)
    React.useEffect(() => {
        dispatch(getTaskWithPaginationAction(filter))
    }, [filter, dispatch])

    const handlePaginate = (pageNumber: number) => {
        setFilter(filter + pageNumber)
    }

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()
    }

    const handleUserLogout = () => {
        swal({
            title: "Do you want to logout?",
            icon: "warning",
            buttons: ["Cancel", "Ok"],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                const action = {
                    id: 1,
                    isLogin: false,
                }
                dispatch(handleLogoutAction(action))
                localStorage.clear()
                history.push("/login")
                swal("Success", {
                    icon: "success",
                })
            }
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Card className="todoForm">
                    <Card.Header className="todoForm--title">
                        <p className="mr-auto mb-0">My tasks</p>
                        <SearchForm />
                        <button
                            className="todoForm--title__avatar"
                            onClick={() => handleUserLogout()}
                            type="button"
                        >
                            <i className="fa fa-power-off" />
                        </button>
                    </Card.Header>
                    <Card.Body>
                        {error ? (
                            <div className="netWorkError">
                                <div className="netWorkError">
                                    <h1 className="mb-2">
                                        Something went wrong
                                    </h1>
                                    <p>
                                        Sorry, something went wrong there. Try
                                        again.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <AddTaskTodo page={filter} />

                                <TodoList
                                    taskList={tasks}
                                    filter={filter}
                                    handlePaginate={handlePaginate}
                                />
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Form>
        </>
    )
}

export default TodoForm
