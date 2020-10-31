export const SET_POSTALCODE = 'SET_POSTALCODE';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_SIDEBARSTATUS = 'SET_SIDEBARSTATUS';

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

interface App {
    postalCode?: number;
    token?: string;
    isSideBarOpen: boolean;
}

export type AppTypes = App;
export type GenericActionTypes =
    | SetPostalCodeAction
    | SetTokenAction
    | SetSideBarAction;
