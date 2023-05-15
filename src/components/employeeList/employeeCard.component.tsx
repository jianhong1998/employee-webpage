import classes from './employeeCard.module.scss';

import { FC, MouseEventHandler } from 'react';
import EmployeeDataModel from '../../models/employeeData.model';
import EditButton from '../ui/editButton.component';
import DeleteButton from '../ui/deleteButton.component';
import { useAppDispatch } from '../../store/index.store';
import { employeeActions } from '../../store/employee.slice';

interface EmployeeCardProps {
    employee: EmployeeDataModel;
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const { id, name, department, salary } = employee;
    const dispatch = useAppDispatch();

    const deleteButtonOnclickHandler: MouseEventHandler = () => {
        dispatch(employeeActions.deleteEmployee({employeeId: id}));
    }

    return (
        <div className={classes.employeeCard}>
            <div className={classes.left}>
                <div className={`${classes.name}`}>{name}</div>
                <div>{department}</div>
                <div>{salary}</div>
            </div>
            <div className={classes.right}>
                <EditButton onClickHandler={() => {}} />
                <DeleteButton onClickHandler={deleteButtonOnclickHandler} />
            </div>
        </div>    
    );
};

export default EmployeeCard;