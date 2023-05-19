import classes from './home.module.scss';

import { FC, useEffect } from "react";
import EmployeeList from "../components/employeeList/employeeList.component";
import { useAppDispatch, useAppSelector } from '../store/index.store';
import { appHeaderAction } from '../store/appHeader.slice';
import DeleteEmployeePopup from '../components/ui/popup/deleteEmployeePopup.component';
import ErrorPopup from '../components/ui/popup/errorPopup.component';
import Loading from '../components/ui/loading/loading';
import PaginationBar from '../components/pagination/paginationBar';
import EmployeeService from '../services/employee.service';
import { errorPopupActions } from '../store/errorPopup.slice';

let isInitialised: boolean = false;

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const { totalEmployee } = useAppSelector(state => state.employees);

    useEffect(() => {
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