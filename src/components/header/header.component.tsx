import { Outlet } from 'react-router-dom';
import AddEmployeeButton from '../ui/buttons/addEmployeeButton.component';
import classes from './header.module.scss';

import { FC } from "react";

const Header: FC = () => {
    return (
        <>
            <header className={`${classes.headerContainer} w-full`}>
                <div>
                    <h1 className={`text-2xl font-black ${classes.title}`}>Employees</h1>
                </div>
                <div>
                    <AddEmployeeButton />
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default Header;