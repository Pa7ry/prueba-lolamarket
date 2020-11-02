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

export interface Error {
    code: string;
    message: string;
}

export interface ErrorDialogProps {
    show: boolean;
    errorMsg: string;
}

export interface Products {
    status: 'OK';
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
    brand: string;
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
    currency: string;
    company_id: number;
    max_price: string;
    max_quantity?: number;
}

export interface CategoryProductsResponse {
    status: string;
    meta: Meta;
    categories: Category3[];
}

export interface Category3 {
    id: string;
    shortcut: string;
    name: string;
    picture: string;
    icon: string;
    is_final: boolean;
    categories: any[];
    items: Item2[];
}

export interface Item2 {
    uuid: string;
    shortcut: string;
    name: string;
    picture: string;
    measure: string;
    unit_of_measure: string;
    nutritional_info: string;
    package_info: string;
    type: string;
    friendly_url: string;
    pictures: string[];
    tags: Tag[][];
    category_id: number;
    category: Category;
    parent_category_id: number;
    parent_category: Category;
    unit_of_price_per: string;
    price: string;
    price_per: string;
    currency: string;
    company_id: number;
    max_price: string;
    description?: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Meta {
    description?: any;
    keywords?: any;
}

export interface App {
    postalCode?: number;
    token?: string;
    isSideBarOpen: boolean;
    shops: PostalCodeOKResponse | undefined;
    isDialogOpen: ErrorDialogProps;
    marketCategories: CategoriesResponse | undefined;
    marketSelected: Market | undefined;
    categoryProducts: CategoryProductsResponse | undefined;
    products: Products | undefined;
}

export type PostalCodeResponse = PostalCodeOKResponse | KOResponse;
export type CategoriesResponse = CategoriesOKResponse | KOResponse;
export type SessionTokenResponse = SessionTokenOKResponse | KOResponse;
export type ProductsResponse = Products | KOResponse;
