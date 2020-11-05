import styled from '@emotion/styled';
import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
} from '@material-ui/core';
import { MarketModel, MarketServiceModel } from 'models/main';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appSelector, getMarketCategories, setData } from 'store/AppSlice';

const ImgContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
});

const CustomCard = styled(Card)({
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

const CustomGrid = styled(Grid)({
    '&:hover': {
        boxShadow: '0 1px 8px #b5b5b5',
    },
    '&:active': {
        boxShadow: 'inset 0 0 12px #b5b5b5',
    },
});

const Container = styled.div({
    padding: '25px 50px',
});

const ProgressGrid = styled(Grid)({
    height: '80vh',
});

const MarketList: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data } = useSelector(appSelector);

    const showMarketCategories = (event: any, market: MarketModel) => {
        dispatch(
            setData({
                marketSelected: market,
            })
        );
        dispatch(getMarketCategories());
        history.push(`/tienda/${market.shortcut}`);
        const cards = document.getElementsByClassName('MuiCard-root');
        Array.from(cards).forEach(
            (element: any) => (element.style.boxShadow = 'none')
        );
        event.currentTarget.style.boxShadow = `0 0 0 2px rgb(${
            market.color !== '255,255,255' ? market.color : '61,86,186'
        })`;
    };

    return data.markets?.status === 'OK' ? (
        <Container>
            <Typography variant="h4" align="center" paragraph>
                ¿Dónde quieres comprar?
            </Typography>
            <Grid container spacing={3}>
                {data.markets?.services.map((services: MarketServiceModel) =>
                    services.markets.map((market: MarketModel) => (
                        <CustomGrid
                            key={market.id}
                            container
                            item
                            lg={2}
                            md={3}
                            sm={6}
                            xs={12}
                        >
                            <CustomCard
                                onClick={event => {
                                    showMarketCategories(event, market);
                                }}
                            >
                                <ImgContainer>
                                    <img
                                        alt={market.name}
                                        src={market.logotype}
                                    />
                                </ImgContainer>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        {services.delivery}
                                    </Typography>
                                </CardContent>
                            </CustomCard>
                        </CustomGrid>
                    ))
                )}
            </Grid>
        </Container>
    ) : (
        <ProgressGrid container justify="center" alignContent="center">
            <Typography align="center" variant="h4">
                <CircularProgress color="secondary" />
                Cargando...
            </Typography>
        </ProgressGrid>
    );
};

export default MarketList;
