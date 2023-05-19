import classes from './popup.module.scss';

import { FC, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/index.store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { deletePopupActions } from "../../../store/deletePopup.slice";
import { errorPopupActions } from "../../../store/errorPopup.slice";
import EmployeeService from "../../../services/employee.service";


const DeleteEmployeePopup: FC = () => {
    const popupState = useAppSelector(state => state.deletePopup);
    const dispatch = useAppDispatch();

    const { employeeId } = useAppSelector(state => state.deletePopup);

    const closeButtonOnClickHandler: MouseEventHandler = () => {
        dispatch(deletePopupActions.closePopup());
    };

    const deleteButtonOnClickHandler: MouseEventHandler = async () => {
        try {
            if (typeof employeeId === "undefined") {
                dispatch(deletePopupActions.closePopup());
                dispatch(errorPopupActions.openPopup({
                    title: 'Lack of data',
                    content: "employeeId is undefined."
                }));
                return;
            }
            
            dispatch(deletePopupActions.closePopup());
            await dispatch(EmployeeService.deleteEmployee(employeeId));
        } catch (error) {
            let errorMessage: string;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = String(error);
            }

            dispatch(errorPopupActions.openPopup({
                title: 'Fail to fetch from backend server',
                content: errorMessage
            }));
        }
    };
    
    return (
        <Dialog data-modal open={popupState.openState}>
            <DialogTitle  className={`${classes.title} ${classes.warning}`}>
                {popupState.title}
            </DialogTitle>
            <DialogContent>
                {popupState.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeButtonOnClickHandler}>Close</Button>
                <Button onClick={deleteButtonOnClickHandler} color={'error'}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteEmployeePopup;