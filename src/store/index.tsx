import { TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/RootSaga";
import { TaskReducer } from "./Reducers/TaskReducer";
import { UserReducer } from "./Reducers/UserReducer";

const rootReducers = combineReducers({
    TaskReducer,
    UserReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducers,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppState = ReturnType<typeof rootReducers>;

export default configureStore;
