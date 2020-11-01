import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@material-ui/core';
import fetcher from 'config/fetcher';
import { CategoriesResponse, Market, Service } from 'models/main';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMarketCategories, setMarketSelected } from 'redux/actions';
import { RootState } from 'redux/reducer';

const ImgContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
});

const Content = styled.div({
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 30,
});

const CustomCard = styled(Card)({
    width: 150,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: '0 10px 10px 0',
    '&:hover': {
        boxShadow: '0 1px 8px #b5b5b5',
    },
    '&:active': {
        boxShadow: 'inset 0 0 12px #b5b5b5',
    },
});

const MarketSelected = styled.div({
    height: 150,
});

const SelectShop: FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((appState: RootState) => appState.data);

    const getMarketCategories = (market: Market) => {
        fetcher<CategoriesResponse>('/company/categories', {
            token: state.token,
            company_id: market.id,
        }).then((res: CategoriesResponse) => {
            dispatch(setMarketCategories(res));
            dispatch(setMarketSelected(market));
        });
    };

    return (
        <>
            <MarketSelected>
                <img src={state?.marketSelected?.logotype} />
                <Typography variant="h4">
                    {state?.marketSelected?.description}
                </Typography>
            </MarketSelected>
            <Content>
                {state.shops?.services.map((services: Service) =>
                    services.markets.map((market: Market) => (
                        <CustomCard
                            key={market.id}
                            onClick={() => getMarketCategories(market)}
                        >
                            <ImgContainer>
                                <img src={market.logotype} />
                            </ImgContainer>
                            <CardContent>
                                <Typography color="textSecondary">
                                    {services.delivery}
                                </Typography>
                            </CardContent>
                        </CustomCard>
                    ))
                )}
            </Content>
        </>
    );
};

export default SelectShop;
