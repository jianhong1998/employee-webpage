import { FC, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/index.store";
import popupSlice from "../../../store/popup.slice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Popup: FC = () => {
    const popupState = useAppSelector(state => state.popup);
    const dispatch = useAppDispatch();

    const closeButtonOnClickHandler: MouseEventHandler = () => {
        dispatch(popupSlice.actions.closePopup());
    };
    
    return (
        <Dialog data-modal open={popupState.openState}>
            <DialogTitle>
                {popupState.title}
            </DialogTitle>
            <DialogContent>
                {popupState.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeButtonOnClickHandler}>Close</Button>
                {
                    popupState.processButton !== null &&
                    <Button onClick={popupState.processButton.processHandler}>
                        {popupState.processButton.content}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default Popup;