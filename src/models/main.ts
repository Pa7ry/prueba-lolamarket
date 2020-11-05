type SuccessResponse = 'OK';
type ErrorResponse = 'Error';

interface ApiSuccessStatus {
    status: SuccessResponse;
}

interface ApiErrorStatus {
    status: ErrorResponse;
}

export type TokenSuccessResponse = ApiSuccessStatus & {
    // SessionTokenOKResponse
    token: string;
};

export type CityMarketsModel = ApiSuccessStatus & {
    // CityMarketsModel
    services: MarketServiceModel[];
    extra_services: any[];
    home_needs: any[];
    subscriptions: any[];
    ready_to_eat: any[];
    city: string;
};

export interface MarketServiceModel {
    type: string;
    is_new: boolean;
    title: string;
    delivery: string;
    description: string;
    features: string[];
    markets: MarketModel[];
    icons?: string[];
    color: string;
}

interface BaseMarket {
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
    equivalent_company_id?: number;
}

interface Company extends BaseMarket {
    // Company
    next_timeslot_label: string;
    next_timeslot: string;
}

export type MarketModel = BaseMarket & {
    // Market
    companies: Company[];
};

interface CategoryBaseModel {
    id: number;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    is_final: boolean;
}

interface Category extends CategoryBaseModel {
    // Category
    categories?: any[];
}

interface Category_B extends CategoryBaseModel {
    // Category2
    categories: Category[];
}

export interface Category_C extends CategoryBaseModel {
    categories: any[];
    items: Item2[];
}

interface CategoriesSuccessResponse extends ApiSuccessStatus {
    // CategoriesOKResponse
    categories: Category_B[];
}

interface Error {
    code: string;
    message: string;
}

export type ApiErrorResponse = ApiErrorStatus & {
    error: Error;
};

export interface ErrorDialogProps {
    show: boolean;
    errorMsg: string;
}

export interface Products extends ApiSuccessStatus {
    items: Item[];
}

export interface Item {
    uuid: string;
    shortcut: string;
    name: string;
    description: string;
    picture: string;
    measure: string;
    unit_of_measure: string;
    nutritional_info: string;
    package_info: string;
    type: string;
    friendly_url: string;
    pictures: string[];
    tags: any[];
    category_id: number;
    category: Category;
    parent_category_id: number;
    parent_category: Category;
    unit_of_price_per: string;
    price: string;
    price_per: string;
    company_id: number;
    max_price: string;
    currency: string;
    max_quantity?: number;
    brand: string;
}

export type Item2 = Omit<Item, 'max_quantity' | 'brand'>;

export interface CategoryProductsResponse {
    status: string;
    meta: Meta;
    categories: Category_C[];
}

interface Meta {
    description?: any;
    keywords?: any;
}

export interface App {
    postalCode?: number;
    token?: string;
    isSideBarOpen: boolean;
    shops: CityMarketsModel | undefined;
    isDialogOpen: ErrorDialogProps;
    marketCategories: CategoriesResponse | undefined;
    marketSelected: MarketModel | undefined;
    categoryProducts: CategoryProductsResponse | undefined;
    products: Products | undefined;
}

export type PostalCodeResponse = CityMarketsModel | ApiErrorResponse;
export type CategoriesResponse = CategoriesSuccessResponse | ApiErrorResponse;
export type SessionTokenResponse = TokenSuccessResponse | ApiErrorResponse;
export type ProductsResponse = Products | ApiErrorResponse;
