import { Outlet } from 'react-router-dom';
import AddEmployeeButton from '../ui/buttons/addEmployeeButton.component';
import classes from './header.module.scss';

import { FC } from "react";
import { useAppSelector } from '../../store/index.store';

const Header: FC = () => {
    const { title } = useAppSelector(state => state.appTitle);
    
    return (
        <>
            <header className={`${classes.headerContainer} w-full`}>
                <div>
                    <h1 className={`text-2xl font-black ${classes.title}`}>
                        {title}
                    </h1>
                </div>
                {
                    document.location.pathname === "/" &&
                    <div>
                        <AddEmployeeButton />
                    </div>
                }
            </header>
            <Outlet />
        </>
    );
};

export default Header;