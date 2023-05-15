import classes from './addEmployeeButton.module.scss';

import { FC, MouseEventHandler } from "react";
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from "../../../store/index.store";
import { employeeActions } from "../../../store/employee.slice";
import EmployeeDataModel from "../../../models/employeeData.model";
import DepartmentType from "../../../models/departmentType.enum";

let employeeIdRunning = 0;

const AddEmployeeButton: FC = () => {
    const dispatch = useAppDispatch();

    const onClickHandler: MouseEventHandler = () => {
        employeeIdRunning++;
        
        const employee: EmployeeDataModel = {
            id: employeeIdRunning,
            name: `Jian Hong ${employeeIdRunning}`,
            salary: 1200,
            department: DepartmentType.PS
        };
        
        dispatch(employeeActions.addEmployee(employee));
    }
    
    return (
        <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={onClickHandler}
            className={classes.addEmployeeButton}
        >
            Add Employee
        </Button>
    );
};

export default AddEmployeeButton;