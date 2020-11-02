import styled from '@emotion/styled';
import {
    AppBar as MuiAppBar,
    Avatar,
    Button,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector, setData } from 'store/AppSlice';

const AppBar: FC = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);

    const CustomMuiAppBar = styled(MuiAppBar)({
        backgroundColor: `rgb(${data.marketSelected?.color})`,
    });

    return (
        <>
            <CustomMuiAppBar position="static">
                <Toolbar color="inherit">
                    {data.marketSelected && (
                        <Button
                            variant="contained"
                            startIcon={
                                <Avatar
                                    style={{ height: '35px', width: '35px' }}
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
                </Toolbar>
            </CustomMuiAppBar>
        </>
    );
};

export default AppBar;
