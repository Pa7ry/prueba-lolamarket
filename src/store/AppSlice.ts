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
    SessionTokenResponse,
} from 'models/main';

interface AppData {
    postalCode?: number;
    token?: string;
    isSideBarOpen?: boolean;
    markets?: PostalCodeOKResponse;
    isDialogOpen: ErrorDialogProps;
    marketCategories?: CategoriesOKResponse;
    marketSelected?: Market;
}

export interface AppState {
    data: AppData;
    loading: boolean;
    errors: string;
}

const initialState: AppState = {
    data: {
        postalCode: undefined,
        token: undefined,
        isSideBarOpen: false,
        markets: undefined,
        isDialogOpen: { show: false, errorMsg: '' },
        marketCategories: undefined,
        marketSelected: undefined,
    },
    loading: false,
    errors: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },

        setErrors: (state, { payload }: PayloadAction<string>) => {
            state.errors = payload;
        },

        setToken: (state, { payload }: PayloadAction<string>) => {
            state.data.token = payload;
        },

        _setPostalCode: (state, { payload }: PayloadAction<number>) => {
            state.data.postalCode = payload;
        },

        _setIsSidebarOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.data.isSideBarOpen = payload;
        },

        setMarkets: (
            state,
            { payload }: PayloadAction<PostalCodeOKResponse>
        ) => {
            state.data.markets = payload;
        },

        _setIsDialogOpen: (
            state,
            { payload }: PayloadAction<ErrorDialogProps>
        ) => {
            state.data.isDialogOpen = payload;
        },

        setMarketCategories: (
            state,
            { payload }: PayloadAction<CategoriesOKResponse>
        ) => {
            state.data.marketCategories = payload;
        },

        _setMarketSelected: (state, { payload }: PayloadAction<Market>) => {
            state.data.marketSelected = payload;
        },
    },
});

export const {
    setLoading,
    setErrors,
    setToken,
    _setPostalCode,
    _setIsSidebarOpen,
    setMarkets,
    _setIsDialogOpen,
    setMarketCategories,
    _setMarketSelected,
} = appSlice.actions;

export default appSlice.reducer;

export const appSelector = (state: { appStore: AppState }) =>
    state.appStore.data;

// Actions

export const setPostalCode = (postalCode: number | string): AppThunk => {
    return async dispatch => {
        try {
            dispatch(_setPostalCode(Number(postalCode)));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };
};

export const setIsSidebarOpen = (isOpen: boolean): AppThunk => {
    return async dispatch => {
        try {
            dispatch(_setIsSidebarOpen(isOpen));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };
};

export const getToken = (): AppThunk => {
    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const res: SessionTokenResponse = await fetcher('/user/session');
            dispatch(setLoading(false));
            switch (res.status) {
                case 'OK':
                    return dispatch(setToken(res.token));
                case 'Error':
                    return dispatch(setErrors(res.error.message));
            }
        } catch (error) {
            dispatch(setErrors(error));
            dispatch(setLoading(false));
        }
    };
};

export const getMarkets = (): AppThunk => {
    return async (dispatch, getState) => {
        const state: any = getState();
        dispatch(setLoading(true));
        try {
            const res: PostalCodeResponse = await fetcher('/user/postalcode', {
                token: state.appStore.data.token,
                postalcode: state.appStore.data.postalCode,
            });
            dispatch(setLoading(false));
            switch (res.status) {
                case 'OK':
                    return dispatch(setMarkets(res));
                case 'Error':
                    return dispatch(setErrors(res.error.message));
            }
        } catch (error) {
            dispatch(setErrors(error));
            dispatch(setLoading(false));
        }
    };
};

export const setIsDialogOpen = (isOpen: ErrorDialogProps): AppThunk => {
    return async dispatch => {
        try {
            dispatch(_setIsDialogOpen(isOpen));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };
};

export const getMarketCategories = (): AppThunk => {
    return async (dispatch, getState) => {
        const state: any = getState();
        dispatch(setLoading(true));
        try {
            const res: CategoriesResponse = await fetcher(
                '/company/categories',
                {
                    token: state.appStore.data.token,
                    company_id: state.appStore.data.marketSelected.id,
                }
            );
            dispatch(setLoading(false));
            switch (res.status) {
                case 'OK':
                    return dispatch(setMarketCategories(res));
                case 'Error':
                    return dispatch(setErrors(res.error.message));
            }
        } catch (error) {
            dispatch(setErrors(error));
            dispatch(setLoading(false));
        }
    };
};

export const setMarketSelected = (market: Market): AppThunk => {
    return async dispatch => {
        try {
            dispatch(_setMarketSelected(market));
        } catch (error) {
            dispatch(setErrors(error));
        }
    };
};
