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

const ErrorDialog: FC = () => {
    const history = useHistory();
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
                        onClick={() => {
                            history.push('./');
                            dispatch(
                                setData({
                                    isDialogOpen: { show: false, errorMsg: '' },
                                })
                            );
                        }}
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
