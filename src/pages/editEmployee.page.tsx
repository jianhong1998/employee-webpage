import classes from './editEmployee.module.scss';

import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/index.store";
import { appHeaderAction } from "../store/appHeader.slice";
import UpdateEmployeeForm from '../components/forms/updateEmployeeForm.component';
import { Button } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { updateEmployeeFormActions } from '../store/updateEmployeeForm.slice';
import { Link } from 'react-router-dom';
import Popup from '../components/ui/popup/popup.component';
import { popupActions } from '../store/popup.slice';
import Loading from '../components/ui/loading/loading';
import EmployeeService from '../services/employee.service';
import EmployeeDataModel from '../models/employeeData.model';



const EditEmployeePage: FC = () => {
    const dispatch = useAppDispatch();
    const linkRef = useRef<HTMLAnchorElement>(null);

    const { idInputData, nameInputData, departmentInputData, salaryInputData } = useAppSelector(state => state.updateEmployeeForm);

    const backToHomePageHandler = useCallback(() => {
        linkRef.current?.click();
        dispatch(updateEmployeeFormActions.clear());
    }, [linkRef, dispatch]);

    const updateButtonClickHandler: MouseEventHandler = async () => {
        try {
            if (
                idInputData.dataValue <= 0 ||
                nameInputData.dataValue.length === 0 ||
                salaryInputData.dataValue.length === 0 ||
                typeof departmentInputData.dataValue === "undefined"
            ) {
                throw new Error('Please fill up employees detail.');
            }
            
            const employee: EmployeeDataModel = {
                id: idInputData.dataValue,
                name: nameInputData.dataValue,
                salary: parseFloat(salaryInputData.dataValue),
                department: departmentInputData.dataValue
            };

            await dispatch(EmployeeService.updateEmployee(employee));

            backToHomePageHandler();
        } catch (error) {
            let errorMessage = '';
            
            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = String(error);
            }
            
            // Display Error in popup
            dispatch(popupActions.openPopup({
                title: "Fail to update employee",
                content: <div>{errorMessage}</div>,
                processButton: null
            }));
        }
    };

    useEffect(() => {
        if (idInputData.dataValue <= 0) {
            backToHomePageHandler();
            return;
        }
        
        dispatch(appHeaderAction.setTitle({title: 'Edit Employee'}));
    }, [dispatch, idInputData.dataValue, backToHomePageHandler]);
    
    return (
        <>
            <Link ref={linkRef} to={'/'} style={{display: 'none'}} />
            <div className={classes.sectionContainer}>
                <div className={classes.formContainer}>
                    <form className={`${classes.editEmployeeForm}`}>
                        <UpdateEmployeeForm />
                    </form>
                    <div className={`${classes.buttonsContainer}`}>
                        <Button
                            variant={'outlined'}
                            color={'error'}
                            startIcon={<ArrowBackIosOutlinedIcon />}
                            size={'medium'}
                            onClick={backToHomePageHandler}
                        >
                            Back
                        </Button>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            startIcon={<SendOutlinedIcon />}
                            size={'medium'}
                            onClick={updateButtonClickHandler}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
            <Popup />
            <Loading />
        </>
    );
}

export default EditEmployeePage;