import styled from '@emotion/styled';
import {
    Button,
    CardMedia,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import routes from 'config/routes';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMarkets, getToken, setData } from 'store/AppSlice';
import ShopDesktop from './../../assets/images/shop-desktop.png';
import ShopMobile from './../../assets/images/shop-mobile.png';

const InputButton = styled.div({
    margin: 15,
    padding: 7,
    border: 'solid 3px #3f51b5',
    display: 'flex',
    width: 'fit-content',
    borderRadius: 7,
    boxShadow: '0 0 450px #f50057',
});

const CustomButton = styled(Button)({
    height: 48,
});

const CustomGrid = styled(Grid)({
    height: 'calc(100vh - 86px)',
});

const CustomCardMedia = styled(CardMedia)({
    width: '100%',
    backgroundSize: 'contain',
});

const Home: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [postalCode, setPostalCode] = useState<string>('');

    const getMarketsAction = () => {
        dispatch(
            setData({
                postalCode: postalCode,
            })
        );
        dispatch(getMarkets());
        history.push(routes.marketList);
    };

    useEffect(() => {
        console.log(ShopDesktop, ShopMobile);
        dispatch(getToken());
    }, [dispatch]);

    return (
        <CustomGrid container justify="center">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                item
                sm={6}
                xs={12}
            >
                <Typography variant="h2" align="center">
                    ¡Quédate en casa! <br /> Nosotros te <br /> hacemos la
                    compra
                </Typography>
                <InputButton>
                    <TextField
                        id="outlined-basic"
                        label="Código postal"
                        required
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setPostalCode(event.target.value)}
                    />

                    <CustomButton
                        variant="contained"
                        color="secondary"
                        disabled={
                            !postalCode.length || !/^[0-9]{5}$/.test(postalCode)
                        }
                        onClick={getMarketsAction}
                    >
                        ¡HACER LA COMPRA!
                    </CustomButton>
                </InputButton>
            </Grid>
            <Grid container item sm={6} xs={12}>
                <CustomCardMedia
                    className="Comprar"
                    src={
                        window.window.screen.width < 450
                            ? ShopMobile
                            : ShopDesktop
                    }
                    title="shopping"
                />
            </Grid>
        </CustomGrid>
    );
};

export default Home;
