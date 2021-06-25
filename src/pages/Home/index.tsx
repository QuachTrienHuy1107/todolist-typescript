import React from "react"

import TodoForm from "../../components/TodoForm"
import "./style.scss"

const Home: React.FC<Record<string, never>> = props => (
    <div className="homeScreen">
        <div className="container">
            <TodoForm />
        </div>
    </div>
)

export default Home
