import { all, fork } from 'redux-saga/effects';
import TasksSaga from './TaskSaga';
import UserSaga from './UserSaga';

export default function* rootSaga() {
    yield all([fork(TasksSaga), fork(UserSaga)]);

}
