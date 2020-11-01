import { combineReducers } from 'redux';
import {
    AppTypes,
    GenericActionTypes,
    SET_POSTALCODE,
    SET_POSTALCODESHOPS,
    SET_SIDEBARSTATUS,
    SET_TOKEN,
    SET_DIALOGSTATUS,
    SET_MARKETCATEGORIES,
    SET_MARKETSELECTED,
} from './types';

const initialState: AppTypes = {
    postalCode: undefined,
    token: undefined,
    isSideBarOpen: false,
    shops: undefined,
    isDialogOpen: { show: false, errorMsg: '' },
    marketCategories: undefined,
    marketSelected: undefined,
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
        case SET_POSTALCODESHOPS:
            return {
                ...state,
                shops: action.payload.shops,
            };
        case SET_DIALOGSTATUS:
            return {
                ...state,
                isDialogOpen: action.payload.isDialogOpen,
            };
        case SET_MARKETCATEGORIES:
            return {
                ...state,
                marketCategories: action.payload.marketCategories,
            };
        case SET_MARKETSELECTED:
            return {
                ...state,
                marketSelected: action.payload.marketSelected,
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
