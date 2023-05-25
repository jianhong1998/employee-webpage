import classes from './userForm.component.module.scss';

import { ChangeEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index.store";
import { userFormActions } from "../../store/userForm.slice";
import { FormControl, MenuItem, TextField } from "@mui/material";
import UserDepartment from "../../models/userDepartment.enum";
import UserFormMode from "../../models/userFormMode.enum";

interface UserFormProps {
    mode: UserFormMode;
}

const UserForm: FC<UserFormProps> = ({ mode }) => {
    const dispatch = useAppDispatch();

    const { username: usernameValue, department: departmentValue, password: passwordValue } = useAppSelector(state => state.userForm);

    const usernameInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length > 0 && event.target.value.split(' ').length > 1) {
            return;
        }

        dispatch(userFormActions.setUsername(event.target.value));
    };

    const passwordInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length > 20) {
            return;
        }

        if (event.target.value.length > 0 && event.target.value.split(' ').length > 1) {
            return;
        }

        dispatch(userFormActions.setPassword(event.target.value));
    };

    const departmentInputOnChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        const department = parseInt(event.target.value);

        dispatch(userFormActions.setDepartment(department));
    };

    return (
        <FormControl
            variant="standard"
            className={classes.userForm}
        >
            <TextField
                required
                label='Username'
                name="username"
                className={classes.input}
                value={usernameValue}
                onChange={usernameInputOnChangeHandler}
            />
            <TextField
                required
                label="Password"
                name="password"
                type={'password'}
                className={classes.input}
                value={passwordValue}
                onChange={passwordInputOnChangeHandler}
            />
            {
                mode === UserFormMode.SIGNUP &&
                <TextField
                    id="update-employee-form-select-department"
                    className={classes.input}
                    label="Department"
                    variant="outlined"
                    value={departmentValue < 0 ? "" : departmentValue}
                    onChange={departmentInputOnChangeHandler}
                    required
                    select
                >
                    <MenuItem value={UserDepartment.ADMIN}>Admin</MenuItem>
                    <MenuItem value={UserDepartment.HR}>HR</MenuItem>
                    <MenuItem value={UserDepartment.PS}>PS</MenuItem>
                </TextField>
            }
            
        </FormControl>
    );
};

export default UserForm;