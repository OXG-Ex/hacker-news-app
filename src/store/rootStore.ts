import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { createRootReducer } from './rootReducer';

const devMode = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const reducer = createRootReducer();

export const store = configureStore({
    reducer: reducer,
    devTools: devMode,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            thunk: false,
            serializableCheck: false
        })
        .concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
