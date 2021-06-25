import * as React from "react"

import {} from "../../store/Reducers/TaskReducer"
import { Tasks } from "../../store/Types/TaskType"
import PageNumber from "../PageNumber"
import ToDo from "../Todo"
import "./style.scss"

interface Props {
    taskList: []
    filter: number
    handlePaginate: (page: number) => void
}

const TodoList: React.FC<Props> = ({ taskList, filter, handlePaginate }) => {
    const renderTaskList = (taskList: Array<Tasks>) =>
        taskList?.map((item: Tasks, index: number) => (
            <ToDo todo={item} page={filter} />
        ))

    // Handle Pagination
    const count = (a: Array<Tasks>) => a?.length
    const toTalPage = count(taskList)

    return (
        <>
            <ul className="item">{renderTaskList(taskList)}</ul>
            <PageNumber
                totalItem={toTalPage}
                handlePaginate={handlePaginate}
                page={filter}
            />
        </>
    )
}

export default TodoList
