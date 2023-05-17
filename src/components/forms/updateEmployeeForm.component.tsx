import classes from './updateEmployeeForm.module.scss';

import { FormControl, MenuItem, TextField } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import DepartmentType from "../../models/departmentType.enum";
import { useAppDispatch, useAppSelector } from '../../store/index.store';
import { updateEmployeeFormActions } from '../../store/updateEmployeeForm.slice';

const UpdateEmployeeForm: FC = () => {
    const dispatch = useAppDispatch();
    
    const { nameInputData, departmentInputData, salaryInputData } = useAppSelector(state => state.updateEmployeeForm);
    
    const salaryInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;

        if (value.length === 0) {
            dispatch(updateEmployeeFormActions.updateSalary({
                dataValue: "",
                errorMessage: undefined
            }));
            return;
        }

        const formattedValue = value.replace(/[^0-9.]/g, '');

        const parts = formattedValue.split('.');

        if (parts.length > 1 && parts[1].length > 2) {
            return;
        }

        dispatch(updateEmployeeFormActions.updateSalary({
            dataValue: formattedValue,
            errorMessage: undefined
        }));
    };

    const nameOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.value;

        dispatch(updateEmployeeFormActions.updateName({
            dataValue: name,
            errorMessage: undefined
        }));
    };

    const departmentOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const department = event.target.value as DepartmentType;

        dispatch(updateEmployeeFormActions.updateDepartment({
            dataValue: department,
            errorMessage: undefined
        }));
    };
    
    return (
        <FormControl
            variant="standard"
            className={classes.updateEmployeeForm}
        >
            <TextField
                required
                label='Name'
                name="name"
                className={classes.input}
                value={nameInputData.dataValue}
                onChange={nameOnChangeHandler}
            />
            <TextField
                required
                label="Salary"
                name="salary"
                className={classes.input}
                value={salaryInputData.dataValue}
                onChange={salaryInputOnChangeHandler}

            />
            <TextField
                id="update-employee-form-select-department"
                className={classes.input}
                label="Department"
                variant="outlined"
                value={typeof departmentInputData.dataValue === "undefined" ? "" : departmentInputData.dataValue}
                onChange={departmentOnChangeHandler}
                required
                select
            >
                <MenuItem value={DepartmentType.PS}>PS</MenuItem>
                <MenuItem value={DepartmentType.HR}>HR</MenuItem>
            </TextField>
        </FormControl>
    );
}

export default UpdateEmployeeForm;