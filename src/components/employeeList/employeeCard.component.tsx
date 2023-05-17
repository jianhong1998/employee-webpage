import classes from './employeeCard.module.scss';

import { FC, MouseEventHandler } from 'react';
import EmployeeDataModel from '../../models/employeeData.model';
import { useAppDispatch } from '../../store/index.store';
import { employeeActions } from '../../store/employee.slice';
import DeleteButton from '../ui/buttons/deleteButton.component';
import EditButton from '../ui/buttons/editButton.component';
import PopupData from '../../models/popupData.model';
import { popupActions } from '../../store/popup.slice';

interface EmployeeCardProps {
    employee: EmployeeDataModel;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const { id, name, department, salary } = employee;
    const dispatch = useAppDispatch();
    
    const deleteEmployeeHandler = (employeeId: number) => {
        dispatch(employeeActions.deleteEmployee({employeeId}));
        dispatch(popupActions.closePopup());
    }
    
    // const updateEmployeeHandler = (updatedEmployee: EmployeeDataModel) => {
        
    // }

    const deleteButtonOnclickHandler: MouseEventHandler = () => {
        const popupData = {
            title: "Are you sure?",
            content: <>Employee will be deleted.</>,
            processButton: {
                content: "DELETE",
                processHandler: () => deleteEmployeeHandler(id)
            }
        } as PopupData;
        
        dispatch(popupActions.openPopup(popupData));
    };

    const editButtonOnClickHandler: MouseEventHandler = () => {
        const popupData = {
            title: "Edit Employee",
            content: <></>,
            processButton: {
                content: "Update",
                // processHandler: () => updateEmployeeHandler()
            }
        } as PopupData;

        dispatch(popupActions.openPopup(popupData));
    };

    return (
        <div className={classes.employeeCard}>
            <div className={classes.left}>
                <div className={`${classes.name}`}>{name}</div>
                <div>{department}</div>
                <div>{salary}</div>
            </div>
            <div className={classes.right}>
                <EditButton onClickHandler={editButtonOnClickHandler} />
                <DeleteButton onClickHandler={deleteButtonOnclickHandler} />
            </div>
        </div>    
    );
};

export default EmployeeCard;