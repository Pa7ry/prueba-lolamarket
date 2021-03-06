import styled from '@emotion/styled';
import {
    AppBar as MuiAppBar,
    Avatar,
    Button,
    FormControl,
    Input,
    InputLabel,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, getMarkets, setData } from 'store/AppSlice';

const CustomToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const MarketAvatar = styled(Avatar)({
    height: 35,
    width: 35,
});

const AppBar: FC = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);

    const changePostalCode = (value: string) => {
        dispatch(setData({ postalCode: value }));
        dispatch(getMarkets());
    };

    const validatePostalCode = (value: string) => /^[0-9]{5}$/.test(value);

    const setInputColor = () => {
        const res =
            data.marketSelected?.color !== '255,255,255'
                ? { color: 'white' }
                : { color: 'black' };
        return res;
    };

    return (
        <MuiAppBar
            position="sticky"
            style={{ background: `rgb(${data.marketSelected?.color})` }}
        >
            <CustomToolbar color="inherit">
                <div>
                    {data.marketSelected && (
                        <Button
                            variant="contained"
                            startIcon={
                                <MarketAvatar
                                    alt={data.marketSelected?.name}
                                    src={data.marketSelected?.icon}
                                />
                            }
                            onClick={() =>
                                dispatch(
                                    setData({
                                        isSideBarOpen: true,
                                    })
                                )
                            }
                        >
                            <Typography variant="h6">CATEGORÍAS</Typography>
                        </Button>
                    )}
                </div>
                {data.postalCode && (
                    <FormControl>
                        <InputLabel
                            style={setInputColor()}
                            htmlFor="edit-postalCode"
                        >
                            {data.markets?.city.toUpperCase()}
                        </InputLabel>
                        <Input
                            color="secondary"
                            style={setInputColor()}
                            id="edit-postalCode"
                            defaultValue={data.postalCode}
                            required
                            onChange={event =>
                                validatePostalCode(event.target.value) &&
                                changePostalCode(event.target.value)
                            }
                        />
                    </FormControl>
                )}
            </CustomToolbar>
        </MuiAppBar>
    );
};

export default AppBar;
