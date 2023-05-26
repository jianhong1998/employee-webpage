import classes from './home.module.scss';

import { FC, useEffect, useRef } from "react";
import EmployeeList from "../components/employeeList/employeeList.component";
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { appHeaderAction } from '../store/appHeader.slice';
import DeleteEmployeePopup from '../components/ui/popup/deleteEmployeePopup.component';
import ErrorPopup from '../components/ui/popup/errorPopup.component';
import Loading from '../components/ui/loading/loading';
import PaginationBar from '../components/pagination/paginationBar';
import EmployeeService from '../services/employee.service';
import { errorPopupActions } from '../store/errorPopup.slice';
import { Link } from 'react-router-dom';
import TokenHandler from '../services/tokenService/tokenHandler.service';

let isInitialised: boolean = false;

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const { totalEmployee } = useAppSelector(state => state.employees);

    const linkRef = useRef<HTMLAnchorElement>(null);
    
    useEffect(() => {
        try {
            TokenHandler.getToken();
        } catch (error) {
            linkRef.current?.click();
            return;
        }

        dispatch(appHeaderAction.setTitle({title: 'Employees'}));
        
        if (!isInitialised) {
            dispatch(EmployeeService.getAllEmployees())
            .catch(error => {
                let errorMessage: string;
    
                if (error instanceof Error) {
                    errorMessage = error.message;
                } else {
                    errorMessage = String(error);
                }
    
                dispatch(errorPopupActions.openPopup({
                    title: 'Fail to fetch from backend server',
                    content: errorMessage
                }));
            });
            isInitialised = true;
        }
    }, [dispatch]);
    
    return (
        <>
            <Link to={'/user/login'} ref={linkRef} style={{display: 'none'}} />
            <section className={`${classes.bodyContainer}`}>
                <div className={`${classes.employeeListContainer}`}>
                    {
                        totalEmployee > 0 &&
                        <EmployeeList />
                    }
                    {
                        totalEmployee === 0 &&
                        <div className={classes.noEmployeeBlock}>
                            <h3>
                                No employee found
                            </h3>
                        </div>
                    }
                </div>
                <PaginationBar />
            </section>
            <DeleteEmployeePopup />
            <ErrorPopup />
            <Loading />
        </>
    );
};

export default HomePage;