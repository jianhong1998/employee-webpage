import classes from './popup.module.scss';

import { FC, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/index.store";
import errorPopupSlice from "../../../store/errorPopup.slice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ErrorPopup: FC = () => {
    const popupState = useAppSelector(state => state.errorPopup);
    const dispatch = useAppDispatch();

    const closeButtonOnClickHandler: MouseEventHandler = () => {
        dispatch(errorPopupSlice.actions.closePopup());
    };
    
    return (
        <Dialog data-modal open={popupState.openState}>
            <DialogTitle className={classes.title}>
                {popupState.title}
            </DialogTitle>
            <DialogContent>
                {popupState.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeButtonOnClickHandler}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ErrorPopup;