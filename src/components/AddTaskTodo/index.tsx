import moment from "moment"
import React, { ChangeEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import swal from "sweetalert"

import { useTypedSelector } from "../../store"
import {
    addTaskListAction,
    getAllTaskAction,
    getTaskWithPaginationAction,
} from "../../store/Actions/TaskAction"
import { Tasks } from "../../store/Types/TaskType"
import { checkTaskList } from "../../utils/constants"
import "./style.scss"

interface Props {
    page: number
}

const AddTaskTodo: React.FC<Props> = ({ page }) => {
    const [taskToDo, setTaskToDo] = React.useState("")

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllTaskAction())
    }, [dispatch])

    const { tasks } = useTypedSelector(state => state.TaskReducer)

    const handleSubmit = async () => {
        if (taskToDo.trim() === "") {
            alert("* Please fill your input")
        } else if (checkTaskList(tasks, taskToDo)) {
            alert("* This task name is already!!")
        } else {
            const action: Tasks = {
                taskName: taskToDo,
                date: moment().format("MMMM Do YYYY"),
                isDone: true,
            }
            await dispatch(addTaskListAction(action))
            dispatch(getTaskWithPaginationAction(page))
            await swal("Success", "", "success")
            setTaskToDo("")
        }
    }

    return (
        <div className="todo">
            <div className="w-100">
                <Form.Group controlId="formBasicEmail" className="w-100 mb-0">
                    <Form.Label>Name</Form.Label>

                    <div className="todo__form">
                        <Form.Control
                            type="text"
                            placeholder="Your todo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setTaskToDo(e.target.value)
                            }}
                        />
                        <Button
                            variant="primary"
                            type="button"
                            className="todo__btn"
                            onClick={() => handleSubmit()}
                        >
                            +
                        </Button>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default AddTaskTodo
