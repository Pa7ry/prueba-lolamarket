import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppState } from './AppSlice';
import appSliceReducer from './AppSlice';

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;
// TODO cambiar el any
const store: any = configureStore({
    reducer: {
        appStore: appSliceReducer,
    },
});

export default store;
