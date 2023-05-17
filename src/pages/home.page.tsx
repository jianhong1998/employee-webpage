import classes from './home.module.scss';

import { FC, useEffect } from "react";
import Popup from "../components/ui/popup/popup.component";
import EmployeeList from "../components/employeeList/employeeList.component";
import { useAppDispatch } from '../store/index.store';
import { appHeaderAction } from '../store/appHeader.slice';

const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appHeaderAction.setTitle({title: 'Employees'}));
    }, []);
    
    return (
        <>
            <section className={`${classes.employeeListContainer}`}>
                <EmployeeList pageNumber={1} />
            </section>
            <Popup />
        </>
    );
};

export default HomePage;