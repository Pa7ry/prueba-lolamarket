export interface SessionToken {
    status: string;
    token: string;
}

export interface PostalCodeResponse {
    status: string;
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

export interface CategoriesResponse {
    status: string;
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
