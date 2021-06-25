import * as React from "react"
import { useDispatch } from "react-redux"
import swal from "sweetalert"

import {
    checkDoneAction,
    deleteTaskAction,
    getTaskWithPaginationAction,
} from "../../store/Actions/TaskAction"
import { Tasks } from "../../store/Types/TaskType"
import ModalForm from "../ModalForm"
import "./style.scss"

interface Props {
    todo: Tasks
    page: number
}

const ToDo: React.FC<Props> = ({ todo, page }) => {
    const [done, setDone] = React.useState(false)
    const [isModalVisible] = React.useState(false)
    const dispatch = useDispatch()

    const removeTask = async (todo: Tasks) => {
        await swal({
            title: "Do you want to delete this task?",
            icon: "warning",
            buttons: ["Cancel", "Ok"],
            dangerMode: true,
        }).then(async willDelete => {
            if (willDelete) {
                await dispatch(deleteTaskAction(todo))
                dispatch(getTaskWithPaginationAction(page))
                await swal("Delete success!!", {
                    icon: "success",
                })
            }
        })
    }

    const handleDone = (id: Tasks) => {
        setDone(!done)
        const action = {
            ...todo,
            isDone: done,
        }
        dispatch(checkDoneAction(id, action))
    }

    return (
        <li className="item__info">
            <i
                aria-label="Check done tassk"
                className={`fa fa-${todo.isDone ? "check" : "times"} mr-2`}
                onClick={() => handleDone(todo)}
                onKeyDown={() => handleDone(todo)}
                role="button"
                tabIndex={0}
            />

            <div
                className="item__info__tasks"
                style={{
                    opacity: todo.isDone ? "1" : "0.5",
                    textDecoration: todo.isDone ? "" : "line-through",
                }}
            >
                <h5 className="mb-0 ">{todo.taskName}</h5>
                <p>{todo.date}</p>
            </div>
            <div className="item__info__btn">
                <ModalForm visible={isModalVisible} todo={todo} />

                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeTask(todo)}
                >
                    <i className="fa fa-trash" />
                </button>
            </div>
        </li>
    )
}

export default ToDo
