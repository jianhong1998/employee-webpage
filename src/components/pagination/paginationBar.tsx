import classes from './paginationBar.module.scss';

import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index.store";
import { employeeActions } from "../../store/employee.slice";

const PaginationBar: FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const dispatch = useAppDispatch();

    const { pageIndex, totalEmployee } = useAppSelector(state => state.employees);

    const [entriesNumberSet, setEntriesNumberSet] = useState<{min: number, max: number}>({min: 0, max: 0});

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const nextPageHandler = () => {
        dispatch(employeeActions.nextPage());
    };

    const previousPageHandler = () => {
        dispatch(employeeActions.previousPage());
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        let min: number;
        let max: number;

        if (totalEmployee === 0) {
            min = 0;
            max = 0;

            setEntriesNumberSet({min, max});
            return;
        }

        min = (pageIndex + 1) * 10 - 9;

        max = min + 9 > totalEmployee ? totalEmployee : min + 9;

        setEntriesNumberSet({min, max});


    }, [totalEmployee, pageIndex]);
    
    return (
        <div className={classes.paginationBar}>
            {
                windowWidth >= 992 &&
                <div className={classes.entriesNumberHolder}>
                    Showing <span className={classes.numberHolder}>{entriesNumberSet.min}-{entriesNumberSet.max}</span> out of <span className={classes.numberHolder}>{totalEmployee}</span> entries
                </div>
            }
            {
                totalEmployee > 0 &&
                <div className={classes.pageControlContainer}>
                    <div>
                        <button
                            disabled={pageIndex === 0}
                            onClick={previousPageHandler}
                        >
                            Previous
                        </button>
                    </div>
                    <div className={classes.pageNumberHolder}>
                        {pageIndex + 1}
                    </div>
                    <div>
                        <button
                            disabled={pageIndex === Math.floor((totalEmployee - 1) / 10) || totalEmployee === 0}
                            onClick={nextPageHandler}
                        >
                            Next
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default PaginationBar;