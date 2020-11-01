export interface SessionTokenOKResponse {
    status: 'OK';
    token: string;
}

export interface PostalCodeOKResponse {
    status: 'OK';
    services: Service[];
    extra_services: any[];
    home_needs: any[];
    subscriptions: any[];
    ready_to_eat: any[];
    city: string;
}

export interface Service {
    type: string;
    is_new: boolean;
    title: string;
    delivery: string;
    description: string;
    features: string[];
    markets: Market[];
    icons?: string[];
    color: string;
}

export interface Market {
    id: number;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    description: string;
    color: string;
    special: boolean;
    logotype: string;
    logotype_background: string;
    superAppLogotype: string;
    highlighted_icon?: string;
    highlighted_text?: string;
    market_type: string;
    service_type: string;
    is_tasty: boolean;
    companies: Company[];
    default_shop: number;
    equivalent_company_id?: number;
}

export interface Company {
    id: number;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    description: string;
    color: string;
    special: boolean;
    logotype: string;
    logotype_background: string;
    superAppLogotype: string;
    highlighted_icon?: string;
    highlighted_text?: string;
    market_type: string;
    service_type: string;
    is_tasty: boolean;
    default_shop: number;
    next_timeslot_label: string;
    next_timeslot: string;
    equivalent_company_id?: number;
}

export interface CategoriesOKResponse {
    status: 'OK';
    categories: Category2[];
}

export interface Category2 {
    id: number;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    is_final: boolean;
    categories: Category[];
}

export interface Category {
    id: number;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    is_final: boolean;
    categories?: any[];
}

export interface KOResponse {
    status: 'Error';
    error: Error;
}

interface Error {
    code: string;
    message: string;
}

export interface ErrorDialogProps {
    show: boolean;
    errorMsg: string;
}

export type PostalCodeResponse = PostalCodeOKResponse | KOResponse;
export type CategoriesResponse = CategoriesOKResponse | KOResponse;
export type SessionTokenResponse = SessionTokenOKResponse | KOResponse;

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
