import classes from './employeeForm.module.scss';

import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/index.store";
import { appHeaderAction } from "../store/appHeader.slice";
import EmployeeForm from '../components/forms/employeeForm.component';
import { Button } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { employeeFormActions } from '../store/employeeForm.slice';
import { Link } from 'react-router-dom';
import Popup from '../components/ui/popup/popup.component';
import { popupActions } from '../store/popup.slice';
import Loading from '../components/ui/loading/loading';
import EmployeeService from '../services/employee.service';
import EmployeeDataModel from '../models/employeeData.model';
import EmployeeFormMode from '../models/employeeFormMode.enum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NewEmployeeDataModel from '../models/newEmployeeData.model';

interface EmployeeFormPageProps {
    mode: EmployeeFormMode
}

const EmployeeFormPage: FC<EmployeeFormPageProps> = ({mode}) => {
    const dispatch = useAppDispatch();
    const linkRef = useRef<HTMLAnchorElement>(null);

    const { idInputData, nameInputData, departmentInputData, salaryInputData } = useAppSelector(state => state.updateEmployeeForm);

    const backToHomePageHandler = useCallback(() => {
        linkRef.current?.click();
        dispatch(employeeFormActions.clear());
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

    const addButtonClickHandler: MouseEventHandler = async () => {
        try {
            if (
                nameInputData.dataValue.length === 0 ||
                salaryInputData.dataValue.length === 0 ||
                typeof departmentInputData.dataValue === "undefined"
            ) {
                throw new Error('Please fill up employees detail.');
            }
            
            const newEmployee: NewEmployeeDataModel = {
                name: nameInputData.dataValue,
                salary: parseFloat(salaryInputData.dataValue),
                department: departmentInputData.dataValue
            };

            await dispatch(EmployeeService.createEmployee(newEmployee));

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
        switch(mode) {
            case EmployeeFormMode.UPDATE:
                if (idInputData.dataValue <= 0) {
                    backToHomePageHandler();
                    return;
                } else {
                    dispatch(appHeaderAction.setTitle({title: 'Edit Employee'}));
                    break;
                }
            case EmployeeFormMode.CREATE:
                dispatch(appHeaderAction.setTitle({title: 'New Employee'}));
                break;
            default:
                break;
        }
    }, [dispatch, idInputData.dataValue, backToHomePageHandler, mode]);
    
    return (
        <>
            <Link ref={linkRef} to={'/'} style={{display: 'none'}} />
            <div className={classes.sectionContainer}>
                <div className={classes.formContainer}>
                    <form className={`${classes.editEmployeeForm}`}>
                        <EmployeeForm />
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
                        {
                            mode === EmployeeFormMode.UPDATE &&
                            <Button
                                variant={'outlined'}
                                color={'primary'}
                                startIcon={<SendOutlinedIcon />}
                                size={'medium'}
                                onClick={updateButtonClickHandler}
                            >
                                Update
                            </Button>
                        }

                        {
                            mode === EmployeeFormMode.CREATE &&
                            <Button
                                variant={'outlined'}
                                color={'success'}
                                startIcon={<PersonAddIcon />}
                                size={'medium'}
                                onClick={addButtonClickHandler}
                            >
                                Add
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <Popup />
            <Loading />
        </>
    );
}

export default EmployeeFormPage;