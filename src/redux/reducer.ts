import { combineReducers } from 'redux';
import {
    AppTypes,
    GenericActionTypes,
    SET_POSTALCODE,
    SET_SIDEBARSTATUS,
    SET_TOKEN,
} from './types';

const initialState: AppTypes = {
    postalCode: undefined,
    token: undefined,
    isSideBarOpen: false,
};

const postsReducer = (
    state = initialState,
    action: GenericActionTypes
): AppTypes => {
    switch (action.type) {
        case SET_POSTALCODE:
            return {
                ...state,
                postalCode: action.payload.postalCode,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
            };
        case SET_SIDEBARSTATUS:
            return {
                ...state,
                isSideBarOpen: action.payload.isSideBarOpen,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    data: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
