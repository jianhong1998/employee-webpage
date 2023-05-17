import classes from './addEmployeeButton.module.scss';

import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Button, IconButton, ThemeProvider, createTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from "../../../store/index.store";
import { employeeActions } from "../../../store/employee.slice";
import EmployeeDataModel from "../../../models/employeeData.model";
import DepartmentType from "../../../models/departmentType.enum";

let employeeIdRunning = 0;

const theme = createTheme({
    palette: {
        text: {
            primary: '#ffffff'
        }
    }
});

const AddEmployeeButton: FC = () => {
    const dispatch = useAppDispatch();

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

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
        <ThemeProvider theme={theme}>
            {
                windowSize >= 992 &&
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={onClickHandler}
                    className={classes.addEmployeeButton}
                >
                    Add Employee
                </Button>
            }
            {
                windowSize < 992 &&
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        color: 'text.primary'
                    }}
                >
                    <AddCircleIcon
                        fontSize='large'
                    />
                </IconButton>
            }
        </ThemeProvider>
    );
};

export default AddEmployeeButton;