import classes from './employeeCard.module.scss';

import { FC, MouseEventHandler } from 'react';
import EmployeeDataModel from '../../models/employeeData.model';
import { useAppDispatch } from '../../store/index.store';
import { employeeActions } from '../../store/employee.slice';
import DeleteButton from '../ui/buttons/deleteButton.component';
import EditButton from '../ui/buttons/editButton.component';
import PopupData from '../../models/popupData.model';
import { popupActions } from '../../store/popup.slice';
import { employeeFormActions } from '../../store/employeeForm.slice';
import { Link } from 'react-router-dom';

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
        dispatch(employeeFormActions.updateSalary({
            dataValue: salary.toString(),
            errorMessage: undefined
        }));

        dispatch(employeeFormActions.updateName({
            dataValue: name,
            errorMessage: undefined
        }));
        dispatch(employeeFormActions.updateDepartment({
            dataValue: department,
            errorMessage: undefined
        }));

        dispatch(employeeFormActions.updateId({
            dataValue: id,
            errorMessage: undefined
        }));
    };

    return (
        <div className={classes.employeeCard}>
            <div className={classes.left}>
                <div className={`${classes.name}`}>{name}</div>
                <div>{department}</div>
                <div>{`$${salary.toFixed(2)}`}</div>
            </div>
            <div className={classes.right}>
                <Link to={'/edit-employee'}>
                    <EditButton onClickHandler={editButtonOnClickHandler} />
                </Link>
                <DeleteButton onClickHandler={deleteButtonOnclickHandler} />
            </div>
        </div>    
    );
};

export default EmployeeCard;