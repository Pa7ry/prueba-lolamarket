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

const ErrorDialog: FC = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(appSelector);

    return (
        <>
            <Dialog
                open={data.isDialogOpen.show}
                onClose={() =>
                    dispatch(
                        setData({
                            isDialogOpen: { show: false, errorMsg: '' },
                        })
                    )
                }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">LO SENTIMOS</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {data.isDialogOpen.errorMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            dispatch(
                                setData({
                                    isDialogOpen: { show: false, errorMsg: '' },
                                })
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
