import {
    CategoriesResponse,
    ErrorDialogProps,
    Market,
    PostalCodeOKResponse,
} from 'models/main';
import {
    GenericActionTypes,
    SET_POSTALCODE,
    SET_TOKEN,
    SET_SIDEBARSTATUS,
    SET_POSTALCODESHOPS,
    SET_DIALOGSTATUS,
    SET_MARKETCATEGORIES,
    SET_MARKETSELECTED,
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

function setPostalCodeShops(shops: PostalCodeOKResponse): GenericActionTypes {
    return {
        type: SET_POSTALCODESHOPS,
        payload: { shops: shops },
    };
}

function setDialogStatus(isDialogOpen: ErrorDialogProps): GenericActionTypes {
    return {
        type: SET_DIALOGSTATUS,
        payload: { isDialogOpen: isDialogOpen },
    };
}

function setMarketCategories(
    marketCategories: CategoriesResponse
): GenericActionTypes {
    return {
        type: SET_MARKETCATEGORIES,
        payload: { marketCategories: marketCategories },
    };
}

function setMarketSelected(marketSelected: Market): GenericActionTypes {
    return {
        type: SET_MARKETSELECTED,
        payload: { marketSelected: marketSelected },
    };
}

export {
    setPostalCode,
    setToken,
    setSideBarStatus,
    setPostalCodeShops,
    setDialogStatus,
    setMarketCategories,
    setMarketSelected,
};
