import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { setDialogStatus } from 'redux/actions';

const ErrorDialog: FC = state => {
    console.log('Error dialog: ', state);
    const dispatch = useDispatch();
    const { isDialogOpen } = useSelector(
        (appState: RootState) => appState.data
    );

    return (
        <>
            <Dialog
                open={isDialogOpen.show}
                onClose={() =>
                    dispatch(setDialogStatus({ show: false, errorMsg: '' }))
                }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">LO SENTIMOS</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {isDialogOpen.errorMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            dispatch(
                                setDialogStatus({ show: false, errorMsg: '' })
                            )
                        }
                        color="primary"
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ErrorDialog;
