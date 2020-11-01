import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import routes from 'config/routes';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMarkets, getToken, setPostalCode } from 'store/AppSlice';

const InputButton = styled.div({
    margin: 15,
    padding: 7,
    border: 'solid 1px blue',
    display: 'flex',
    width: 'fit-content',
    borderRadius: 7,
});

const CustomButton = styled(Button)({
    height: 48,
});

const Home: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [zip, setZip] = useState<string>('');

    const getMarketsByZip = () => {
        dispatch(setPostalCode(zip));
        dispatch(getMarkets());
        history.push(routes.selectShop);
    };

    useEffect(() => {
        dispatch(getToken());
    }, [dispatch]);

    return (
        <InputButton>
            <TextField
                id="outlined-basic"
                label="Código postal"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setZip(event.target.value)
                }
            />

            <CustomButton
                variant="contained"
                color="secondary"
                disabled={zip.length !== 5}
                onClick={getMarketsByZip}
            >
                ¡HACER LA COMPRA!
            </CustomButton>
        </InputButton>
    );
};

export default Home;
