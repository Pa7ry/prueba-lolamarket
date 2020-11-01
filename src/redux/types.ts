import {
    CategoriesResponse,
    ErrorDialogProps,
    Market,
    PostalCodeOKResponse,
} from 'models/main';

export const SET_POSTALCODE = 'SET_POSTALCODE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_SIDEBARSTATUS = 'SET_SIDEBARSTATUS';
export const SET_POSTALCODESHOPS = 'SET_POSTALCODESHOPS';
export const SET_DIALOGSTATUS = 'SET_DIALOGSTATUS';
export const SET_MARKETCATEGORIES = 'SET_MARKETCATEGORIES';
export const SET_MARKETSELECTED = 'SET_MARKETSELECTED';

interface SetPostalCodeAction {
    type: typeof SET_POSTALCODE;
    payload: {
        postalCode: number;
    };
}

interface SetTokenAction {
    type: typeof SET_TOKEN;
    payload: {
        token: string;
    };
}

interface SetSideBarAction {
    type: typeof SET_SIDEBARSTATUS;
    payload: {
        isSideBarOpen: boolean;
    };
}

interface SetPostalCodeShopsAction {
    type: typeof SET_POSTALCODESHOPS;
    payload: {
        shops: PostalCodeOKResponse;
    };
}

interface SetDialogAction {
    type: typeof SET_DIALOGSTATUS;
    payload: {
        isDialogOpen: ErrorDialogProps;
    };
}

interface SetMarketCategoriesActions {
    type: typeof SET_MARKETCATEGORIES;
    payload: {
        marketCategories: CategoriesResponse;
    };
}

interface SetMarketSelectedActions {
    type: typeof SET_MARKETSELECTED;
    payload: {
        marketSelected: Market;
    };
}

interface App {
    postalCode?: number;
    token?: string;
    isSideBarOpen: boolean;
    shops: PostalCodeOKResponse | undefined;
    isDialogOpen: ErrorDialogProps;
    marketCategories: CategoriesResponse | undefined;
    marketSelected: Market | undefined;
}

export type AppTypes = App;
export type GenericActionTypes =
    | SetPostalCodeAction
    | SetTokenAction
    | SetSideBarAction
    | SetPostalCodeShopsAction
    | SetDialogAction
    | SetMarketCategoriesActions
    | SetMarketSelectedActions;
