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
import styled from '@emotion/styled';
import { Edit } from '@material-ui/icons';
import {
    appSelector,
    getMarkets,
    setIsSidebarOpen,
    setPostalCode,
} from 'store/AppSlice';

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
    const { markets } = useSelector(appSelector);

    const getMarketsByZip = (zip: string) => {
        dispatch(setPostalCode(zip));
        dispatch(getMarkets());
    };

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar color="inherit">
                    <Button
                        onClick={() => dispatch(setIsSidebarOpen(true))}
                        color="inherit"
                    >
                        Menú
                    </Button>
                    <PostalCode>
                        <div>{markets?.city.toUpperCase()}</div>
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
