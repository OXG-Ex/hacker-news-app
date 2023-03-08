import { all } from 'redux-saga/effects';
import { newsSagas } from '../sagas/newsSaga';

export default function* rootSaga(): Generator {
    yield all([
        ...newsSagas
    ]);
}
