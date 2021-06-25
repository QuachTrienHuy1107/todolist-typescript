import { Form, Input, Modal } from "antd"
import moment from "moment"
import * as React from "react"
import { useDispatch } from "react-redux"
import swal from "sweetalert"

import { useTypedSelector } from "../../store"
import { updateTaskAction } from "../../store/Actions/TaskAction"
import { Tasks } from "../../store/Types/TaskType"
import { checkTaskList } from "../../utils/constants"

interface Props {
    todo: Tasks
    visible: boolean
}

const ModalForm: React.FC<Props> = ({ todo, visible }): JSX.Element => {
    const [updateTaskName, setUpdateTaskName] = React.useState("")
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const dispatch = useDispatch()

    const { tasks } = useTypedSelector(state => state.TaskReducer)

    const handleOk = async (id: Tasks) => {
        if (updateTaskName.trim() === "") {
            await swal("Please fill your input!!!", "", "warning")
        } else if (checkTaskList(tasks, updateTaskName)) {
            await swal("This task is already!!!", "", "warning")
        } else {
            const action: Tasks = {
                taskName: updateTaskName,
                date: moment().format("MMMM Do YYYY"),
                isDone: true,
            }
            dispatch(updateTaskAction(id, action))
            setIsModalVisible(false)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={() => setIsModalVisible(!isModalVisible)}
            >
                <i className="fa fa-pen" />
            </button>

            <Modal
                title="Edit Todo"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => handleOk(todo)}
            >
                <Form>
                    <Form.Item label="Your todo" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                            style={{
                                display: "inline-block",
                                width: "calc(50% - 8px)",
                            }}
                        >
                            <Input
                                placeholder="Update TaskName"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    setUpdateTaskName(e.target.value)
                                }}
                                defaultValue={todo.taskName}
                                required
                            />
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalForm
