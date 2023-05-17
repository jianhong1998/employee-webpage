import classes from './editEmployee.module.scss';

import { FC, MouseEventHandler, useEffect } from "react";
import { useAppDispatch } from "../store/index.store";
import { appHeaderAction } from "../store/appHeader.slice";
import UpdateEmployeeForm from '../components/forms/updateEmployeeForm.component';
import { Button } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { updateEmployeeFormActions } from '../store/updateEmployeeForm.slice';
import { Link } from 'react-router-dom';

const EditEmployeePage: FC = () => {
    const dispatch = useAppDispatch();

    const onBackButtonOnClick: MouseEventHandler = () => {
        dispatch(updateEmployeeFormActions.clear());
    }

    useEffect(() => {
        dispatch(appHeaderAction.setTitle({title: 'Edit Employee'}));
    }, []);
    
    return (
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
                        onClick={onBackButtonOnClick}
                    >
                        <Link to={'/'}>
                            Back
                        </Link>
                    </Button>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        startIcon={<SendOutlinedIcon />}
                        size={'medium'}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditEmployeePage;