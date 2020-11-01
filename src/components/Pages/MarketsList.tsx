import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Market, Service } from 'models/main';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    appSelector,
    getMarketCategories,
    setMarketSelected,
} from 'store/AppSlice';

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
    const { marketSelected, markets } = useSelector(appSelector);

    const showMarketCategories = (event: any, market: Market) => {
        dispatch(setMarketSelected(market));
        dispatch(getMarketCategories());
        const cards = document.getElementsByClassName('MuiCard-root');
        Array.from(cards).map(
            (element: any) => (element.style.boxShadow = 'none')
        );
        event.currentTarget.style.boxShadow = `0 0 0 2px rgb(${
            market.color !== '255,255,255' ? market.color : '61,86,186'
        })`;
    };

    return (
        <>
            <MarketSelected>
                <img
                    alt={marketSelected?.name}
                    src={marketSelected?.logotype}
                />
                <Typography variant="h4">
                    {marketSelected?.description}
                </Typography>
            </MarketSelected>
            <Content>
                {markets?.services.map((services: Service) =>
                    services.markets.map((market: Market) => (
                        <CustomCard
                            key={market.id}
                            onClick={event =>
                                showMarketCategories(event, market)
                            }
                        >
                            <ImgContainer>
                                <img alt={market.name} src={market.logotype} />
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
