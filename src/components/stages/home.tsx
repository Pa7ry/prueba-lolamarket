import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import { PostalCodeResponse, SessionToken } from 'models/main';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDialogStatus,
    setPostalCode,
    setPostalCodeShops,
    setToken,
} from 'redux/actions';
import fetcher from './../../config/fetcher';
import { useHistory } from 'react-router-dom';
import routes from 'config/routes';
import { RootState } from 'redux/reducer';

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
    const { token } = useSelector((appState: RootState) => appState.data);

    const [zip, setZip] = useState<string>('');

    const getMarketsByZip = () => {
        dispatch(setPostalCode(Number(zip)));
        fetcher<PostalCodeResponse>('/user/postalcode', {
            token: token,
            postalcode: Number(zip),
        }).then((res: PostalCodeResponse) => {
            switch (res.status) {
                case 'OK':
                    dispatch(setPostalCodeShops(res));
                    return history.push(routes.selectShop);
                case 'Error':
                    return dispatch(
                        setDialogStatus({
                            show: true,
                            errorMsg: res.error.message,
                        })
                    );
            }
        });
    };

    useEffect(() => {
        fetcher<SessionToken>('/user/session').then(res =>
            dispatch(setToken(res.token))
        );
    }, []);

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
