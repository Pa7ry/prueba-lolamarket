import {
    AppBar as MuiAppBar,
    Button,
    // IconButton,
    // Input,
    // InputAdornment,
    InputBase,
    // InputLabel,
    Toolbar,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDialogStatus,
    setPostalCode,
    setPostalCodeShops,
    setSideBarStatus,
} from 'redux/actions';
import { RootState } from 'redux/reducer';
import styled from '@emotion/styled';
import fetcher from 'config/fetcher';
import { PostalCodeResponse } from 'models/main';
import { Edit } from '@material-ui/icons';

const PostalCode = styled.div({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 20,
});

const InputGroup = styled.div({
    width: 150,
    textAlign: 'center',
    display: 'flex',
    backgroundColor: '#ffffff38',
    padding: '7px 12px',
    borderRadius: 7,
});

const CustomInputBase = styled(InputBase)({
    color: 'white',
});

const AppBar: FC = () => {
    const dispatch = useDispatch();
    const state = useSelector((appState: RootState) => appState.data);

    const getMarketsByZip = (zip: string) => {
        dispatch(setPostalCode(Number(zip)));
        fetcher<PostalCodeResponse>('/user/postalcode', {
            token: state.token,
            postalcode: Number(zip),
        }).then((res: PostalCodeResponse) => {
            switch (res.status) {
                case 'OK':
                    return dispatch(setPostalCodeShops(res));
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

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar color="inherit">
                    <Button
                        onClick={() => dispatch(setSideBarStatus(true))}
                        color="inherit"
                    >
                        Menú
                    </Button>
                    <PostalCode>
                        <div>{state.shops?.city.toUpperCase()}</div>
                        <InputGroup>
                            <CustomInputBase
                                placeholder="Search…"
                                onChange={event =>
                                    event.target.value.length === 5 &&
                                    getMarketsByZip(event.target.value)
                                }
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <Edit />
                        </InputGroup>
                    </PostalCode>
                </Toolbar>
            </MuiAppBar>
        </>
    );
};

export default AppBar;
