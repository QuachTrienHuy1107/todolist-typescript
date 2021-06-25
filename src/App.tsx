import { Suspense } from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./router/PrivateRoute";

const App: React.FC = () => (
    <div className="App homeScreen">
        <Suspense fallback={<div>Loading</div>}>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/notfound" component={NotFound} />
            </Switch>
        </Suspense>
    </div>
);

export default App;
