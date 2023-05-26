import classes from './popup.module.scss';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from '../../../store/index.store';
import { logoutPopupSliceAction } from '../../../store/logoutPopup.slice';
import { Link } from 'react-router-dom';

const LogoutPopup: FC = () => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    
    const { openState } = useAppSelector(state => state.logoutPopup);
    const dispatch = useAppDispatch();
    
    const closeButtonOnClickHandler = () => {
        dispatch(logoutPopupSliceAction.closePopup());
    };

    const logoutButtonOnClickHandler = () => {
        dispatch(logoutPopupSliceAction.closePopup());

        linkRef.current?.click();
    };
    
    return (
        <>
            <Link ref={linkRef} to={'/user/login'} style={{display: 'none'}} />
            <Dialog data-modal open={openState}>
            <DialogTitle  className={`${classes.title} ${classes.warning}`}>
                Are you sure?
            </DialogTitle>
            <DialogContent>
                You are going to logout.
            </DialogContent>
            <DialogActions>
                <Button onClick={closeButtonOnClickHandler}>Close</Button>
                <Button onClick={logoutButtonOnClickHandler} color={'error'}>Logout</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default LogoutPopup;