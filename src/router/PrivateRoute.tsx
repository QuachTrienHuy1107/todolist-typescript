import React from "react"
import { Link, Redirect, Route, RouteProps } from "react-router-dom"
import useLocalStorage from "../hooks/useLocalStorage"
import { useTypedSelector } from "../store"

export type PrivateRouteProps = {
    component: React.ComponentType
} & RouteProps

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
    const { isLogin } = useTypedSelector(state => state.UserReducer)
    const [getUser, setUser] = useLocalStorage("user", true)

    return (
        <Route
            {...rest}
            render={props =>
                (isLogin && <Component {...props} />) || (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute
