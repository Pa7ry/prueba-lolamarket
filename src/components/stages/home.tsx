import styled from '@emotion/styled';
import { Button, TextField } from '@material-ui/core';
import { mapStateToProps } from 'components/common/utils';
import { PostalCodeResponse, SessionToken } from 'models/main';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setPostalCode, setToken } from 'redux/actions';
import { RootState } from 'redux/reducer';
import fetcher from './../../config/fetcher';
import store from './../../redux/store';

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

const Home: FC<RootState> = state => {
    const [zip, setZip] = useState<string>('');

    const getMarketsByZip = () => {
        store.dispatch(setPostalCode(Number(zip)));
        fetcher<PostalCodeResponse>('/user/postalcode', {
            token: state.data.token,
            postalcode: zip,
        }).then(res => console.log(res));
    };

    useEffect(() => {
        fetcher<SessionToken>('/user/session').then(res =>
            store.dispatch(setToken(res.token))
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

export default connect(mapStateToProps)(Home);
