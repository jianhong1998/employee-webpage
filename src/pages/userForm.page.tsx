import classes from './formPage.module.scss'

import { FC } from "react";
import UserForm from "../components/forms/userForm.component";
import UserFormMode from "../models/userFormMode.enum";
import ErrorPopup from "../components/ui/popup/errorPopup.component";
import Loading from "../components/ui/loading/loading";
import { Button } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

interface UserFormProps {
    mode: UserFormMode;
}

const UserFormPage: FC<UserFormProps> = ({ mode }) => {
    return (
        <>
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
                                    onClick={() => {}}
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
                                    onClick={() => {}}
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
                            <div><Link to={'/user/login'} className={`${classes.loginLink} ${classes.link}`}>Login</Link></div>
                        </div>
                    }
                    {
                        mode === UserFormMode.LOGIN &&
                        <div className={classes.redirectLinkContainer}>
                            <div>Don't have account?</div>
                            <div><Link to={'/user/sign-up'} className={`${classes.registerLink} ${classes.link}`}>Register</Link></div>
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