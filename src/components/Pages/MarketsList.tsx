import styled from '@emotion/styled';
import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';
import { Market, Service } from 'models/main';
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

const MarketList: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { data } = useSelector(appSelector);

    const showMarketCategories = (event: any, market: Market) => {
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
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h4">Tú eliges:</Typography>
                </Grid>
                {data.markets?.services.map((services: Service) => (
                    <Grid item md={6}>
                        <Typography variant="h5">{services.title}</Typography>
                        <List dense={true}>
                            {services.features.map((feature: string) => (
                                <ListItem>
                                    <ListItemIcon>
                                        <FavoriteBorder />
                                    </ListItemIcon>
                                    <ListItemText>{feature}</ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={3}>
                {data.markets?.services.map((services: Service) =>
                    services.markets.map((market: Market) => (
                        <CustomGrid container item md={2} sm={6} xs={12}>
                            <CustomCard
                                key={market.id}
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
        <h2>
            <CircularProgress color="secondary" />
            Cargando
        </h2>
    );
};

export default MarketList;
