import { AppBar as MuiAppBar, Button, Toolbar } from '@material-ui/core';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import routes from 'config/routes';
import { connect } from 'react-redux';
import { mapStateToProps } from 'components/common/utils';
import store from './../../redux/store';
import { setSideBarStatus } from 'redux/actions';
import { RootState } from 'redux/reducer';

const AppBar: FC<RootState> = state => {
    console.log('State desde AppBar: ', state);

    return (
        <>
            <MuiAppBar position="static">
                <Toolbar color="inherit">
                    <Button
                        component={NavLink}
                        to={routes.home}
                        color="inherit"
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => store.dispatch(setSideBarStatus(true))}
                        color="inherit"
                    >
                        Menú
                    </Button>
                </Toolbar>
            </MuiAppBar>
        </>
    );
};

export default connect(mapStateToProps)(AppBar);
