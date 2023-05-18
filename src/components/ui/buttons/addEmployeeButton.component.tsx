import classes from './addEmployeeButton.module.scss';

import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Button, IconButton, ThemeProvider, createTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from "../../../store/index.store";
import { employeeFormActions } from '../../../store/employeeForm.slice';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        text: {
            primary: '#ffffff'
        }
    }
});

const AddEmployeeButton: FC = () => {
    const dispatch = useAppDispatch();

    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const linkRef = useRef<HTMLAnchorElement>(null);

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
        dispatch(employeeFormActions.clear());
        linkRef.current?.click();
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Link ref={linkRef} to={'/new-employee'} style={{display: 'none'}} />
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