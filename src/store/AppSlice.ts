import { fetcher } from 'config/fetcher';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './';
import {
    CategoriesOKResponse,
    CategoriesResponse,
    ErrorDialogProps,
    Market,
    PostalCodeOKResponse,
    PostalCodeResponse,
    Products,
    CategoryProductsResponse,
    ProductsResponse,
    SessionTokenResponse,
} from 'models/main';

interface AppData {
    postalCode?: number;
    token?: string;
    isSideBarOpen: boolean;
    markets?: PostalCodeOKResponse;
    isDialogOpen: ErrorDialogProps;
    marketCategories?: CategoriesOKResponse;
    marketSelected?: Market;
    products?: Products;
    categoryProducts?: CategoryProductsResponse;
}

export interface AppState {
    data: AppData;
    asyncLoading: boolean;
    asyncError: string;
}

const initialState: AppState = {
    data: {
        isSideBarOpen: false,
        isDialogOpen: { show: false, errorMsg: '' },
    },
    asyncLoading: false,
    asyncError: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        asyncStart: state => ({
            ...state,
            asyncLoading: true,
        }),
        asyncSuccess: (
            state,
            { payload }: PayloadAction<{ [key: string]: any }>
        ) => ({
            ...state,
            asyncLoading: false,
            data: {
                ...state.data,
                ...payload,
            },
        }),
        asyncError: (state, { payload }: PayloadAction<string>) => ({
            ...state,
            asyncLoading: false,
            asyncError: payload,
        }),
    },
});

export const { asyncStart, asyncSuccess, asyncError } = appSlice.actions;

export default appSlice.reducer;

export const appSelector = (state: { appStore: AppState }) => state.appStore;

export const getToken = (): AppThunk => {
    return async dispatch => {
        dispatch(asyncStart());

        try {
            const data: SessionTokenResponse = await fetcher('/user/session');
            if (data.status === 'OK') {
                dispatch(
                    asyncSuccess({
                        token: data.token,
                    })
                );
            } else {
                throw data.error.message;
            }
        } catch (error) {
            dispatch(asyncError(error));
            dispatch(
                setData({ isDialogOpen: { show: true, errorMsg: error } })
            );
        }
    };
};

export const getMarkets = (): AppThunk => {
    return async (dispatch, getstate) => {
        dispatch(asyncStart());
        const state: any = getstate();
        try {
            const data: PostalCodeResponse = await fetcher('/user/postalcode', {
                token: state.appStore.data.token,
                postalcode: state.appStore.data.postalCode,
            });
            if (data.status === 'OK') {
                dispatch(
                    asyncSuccess({
                        markets: data,
                    })
                );
            } else {
                throw data.error.message;
            }
        } catch (error) {
            dispatch(asyncError(error));
            dispatch(
                setData({ isDialogOpen: { show: true, errorMsg: error } })
            );
        }
    };
};

export const getMarketCategories = (): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(asyncStart());
        const state: any = getState();
        try {
            const data: CategoriesResponse = await fetcher(
                '/company/categories',
                {
                    token: state.appStore.data.token,
                    company_id: state.appStore.data.marketSelected?.id,
                }
            );
            if (data.status === 'OK') {
                dispatch(
                    asyncSuccess({
                        marketCategories: data,
                    })
                );
            } else {
                throw data.error.message;
            }
        } catch (error) {
            dispatch(asyncError(error));
            dispatch(
                setData({ isDialogOpen: { show: true, errorMsg: error } })
            );
        }
    };
};

export const getProducts = (category_id: number): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(asyncStart());
        const state: any = getState();
        try {
            const data: ProductsResponse = await fetcher('/company/items', {
                token: state.appStore.data.token,
                company_id: state.appStore.data.marketSelected?.id,
                category_id: category_id,
            });
            if (data.status === 'OK') {
                dispatch(
                    asyncSuccess({
                        products: data,
                    })
                );
            } else {
                throw data.error.message;
            }
        } catch (error) {
            dispatch(asyncError(error));
            dispatch(
                setData({ isDialogOpen: { show: true, errorMsg: error } })
            );
        }
    };
};

export const getCategoryProducts = (category_id: number): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(asyncStart());
        const state: any = getState();
        try {
            const data: ProductsResponse = await fetcher('/company/featured', {
                token: state.appStore.data.token,
                company_id: state.appStore.data.marketSelected?.id,
                category_id: category_id,
            });
            if (data.status === 'OK') {
                dispatch(
                    asyncSuccess({
                        categoryProducts: data,
                    })
                );
            } else {
                throw data.error.message;
            }
        } catch (error) {
            dispatch(asyncError(error));
            dispatch(
                setData({ isDialogOpen: { show: true, errorMsg: error } })
            );
        }
    };
};

export const setData = <T>(data: { [key: string]: T }): AppThunk => {
    return async dispatch => {
        try {
            dispatch(asyncSuccess(data));
        } catch (error) {
            dispatch(asyncError(error));
        }
    };
};
