import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { appSelector, setData } from 'store/AppSlice';
import { useHistory } from 'react-router-dom';
import routes from 'config/routes';

const AppDialog: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);

    const closeDialog = () => {
        !data.isDialogOpen.dialogTitle && history.push(routes.home);
        dispatch(
            setData({
                isDialogOpen: {
                    show: false,
                    dialogMsg: '',
                    dialogTitle: undefined,
                },
            })
        );
    };

    return (
        <>
            <Dialog
                open={data.isDialogOpen.show}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {data?.isDialogOpen?.dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {data?.isDialogOpen?.dialogMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AppDialog;
