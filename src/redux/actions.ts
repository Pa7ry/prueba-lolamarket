import {
    GenericActionTypes,
    SET_POSTALCODE,
    SET_TOKEN,
    SET_SIDEBARSTATUS,
} from './types';

function setPostalCode(postalCode: number): GenericActionTypes {
    return {
        type: SET_POSTALCODE,
        payload: { postalCode: postalCode },
    };
}

function setToken(token: string): GenericActionTypes {
    return {
        type: SET_TOKEN,
        payload: { token: token },
    };
}

function setSideBarStatus(isOpen: boolean): GenericActionTypes {
    return {
        type: SET_SIDEBARSTATUS,
        payload: { isSideBarOpen: isOpen },
    };
}

export { setPostalCode, setToken, setSideBarStatus };
