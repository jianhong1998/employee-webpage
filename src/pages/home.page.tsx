import classes from './home.module.scss';

import { FC } from "react";
import Popup from "../components/ui/popup/popup.component";
import EmployeeList from "../components/employeeList/employeeList.component";

const HomePage: FC = () => {
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