import classes from './home.module.scss';

import { FC, useEffect } from "react";
import EmployeeList from "../components/employeeList/employeeList.component";
import { useAppDispatch } from '../store/index.store';
import { appHeaderAction } from '../store/appHeader.slice';
import DeleteEmployeePopup from '../components/ui/popup/deleteEmployeePopup.component';
import ErrorPopup from '../components/ui/popup/errorPopup.component';
import Loading from '../components/ui/loading/loading';

const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appHeaderAction.setTitle({title: 'Employees'}));
    }, [dispatch]);
    
    return (
        <>
            <section className={`${classes.employeeListContainer}`}>
                <EmployeeList pageNumber={1} />
            </section>
            <DeleteEmployeePopup />
            <ErrorPopup />
            <Loading />
        </>
    );
};

export default HomePage;