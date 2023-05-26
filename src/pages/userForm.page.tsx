import classes from './formPage.module.scss'

import { FC, MouseEventHandler, useEffect, useRef } from "react";
import UserForm from "../components/forms/userForm.component";
import UserFormMode from "../models/userFormMode.enum";
import ErrorPopup from "../components/ui/popup/errorPopup.component";
import Loading from "../components/ui/loading/loading";
import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/index.store';
import UserService from '../services/userService/user.service';
import { errorPopupActions } from '../store/errorPopup.slice';
import RegisterUser from '../models/userModels/registerUser.model';
import LoginUser from '../models/userModels/loginUser.model';
import { loggedInUserActions } from '../store/loggedInUser.slice';

interface UserFormProps {
    mode: UserFormMode;
}

const UserFormPage: FC<UserFormProps> = ({ mode }) => {
    const dispatch = useAppDispatch();
    const { username, password, department } = useAppSelector(state => state.userForm);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (typeof localStorage.getItem('token') !== 'undefined') {
            localStorage.removeItem('token');
        }
        
        dispatch(loggedInUserActions.clearLoggedInUserState());
    }, [dispatch]);
    
    const handleLoginButtonOnClick: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            if (username.length === 0 || password.length === 0) {
                throw new Error('Please fill up username and password.');
            }
            
            const user: LoginUser = {
                username,
                password,
            };

            await dispatch(UserService.loginUser(user));
            
            linkRef.current?.click();
        } catch (error) {
            let errorMessage: string;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = String(error);
            }

            dispatch(errorPopupActions.openPopup({
                title: 'Fail to Login',
                content: errorMessage
            }));
        }
    };
    
    const handleRegisterButtonOnClick: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            if (username.length === 0 || password.length === 0 || department <= 0) {
                throw new Error('Please fill up username, password and department.');
            }
            
            const user: RegisterUser = {
                username,
                password,
                departmentId: department
            };

            await dispatch(UserService.registerUser(user));
        } catch (error) {
            let errorMessage: string;

            if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = String(error);
            }

            dispatch(errorPopupActions.openPopup({
                title: 'Fail to Register User',
                content: errorMessage
            }));
        }
    };
    
    return (
        <>
            <Link to={'/'} ref={linkRef} style={{display: 'none'}} />
            <div className={`${classes.sectionContainer} ${classes.userFormPageSectionContainer}`}>
                <div>
                    <div className={classes.formContainer}>
                        <form className={`${classes.userForm}`}>
                            <UserForm mode={mode} />
                        </form>
                        <div className={`${classes.buttonsContainer}`}>
                            {
                                mode === UserFormMode.SIGNUP &&
                                <Button
                                    variant={'outlined'}
                                    color={'primary'}
                                    fullWidth={true}
                                    startIcon={<PersonAddIcon />}
                                    size={'medium'}
                                    onClick={handleRegisterButtonOnClick}
                                >
                                    Register
                                </Button>
                            }
                            {
                                mode === UserFormMode.LOGIN &&
                                <Button
                                    variant={'outlined'}
                                    color={'success'}
                                    fullWidth={true}
                                    startIcon={<LoginIcon />}
                                    size={'medium'}
                                    onClick={handleLoginButtonOnClick}
                                >
                                    Login
                                </Button>
                            }
                        </div>
                    </div>
                    {
                        mode === UserFormMode.SIGNUP &&
                        <div className={classes.redirectLinkContainer}>
                            <div>Have account already?</div>
                            <div>
                                <Link
                                    to={'/user/login'}
                                    className={`${classes.loginLink} ${classes.link}`}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    }
                    {
                        mode === UserFormMode.LOGIN &&
                        <div className={classes.redirectLinkContainer}>
                            <div>Don't have account?</div>
                            <div>
                                <Link
                                    to={'/user/sign-up'}
                                    className={`${classes.registerLink} ${classes.link}`}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <ErrorPopup />
            <Loading />
        </>
    );
}

export default UserFormPage;