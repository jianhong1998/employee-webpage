import classes from './employeeList.module.scss';

import { FC, useEffect, useState } from "react";
import EmployeeDataModel from "../../models/employeeData.model";
import { useAppSelector } from "../../store/index.store";
import EmployeeCard from './employeeCard.component';

interface EmployeeListProps {
    pageNumber: number;
}

const filterDisplayEmployeeArray = (fullEmployeeArray: EmployeeDataModel[], pageNumber: number): EmployeeDataModel[] => {
    const employeeArray = [] as EmployeeDataModel[];

    for (let index = (pageNumber * 10) - 10; (index < fullEmployeeArray.length && index < pageNumber * 10); index++) {
        employeeArray.push(fullEmployeeArray[index]);
    }

    return employeeArray;
}

const EmployeeList: FC<EmployeeListProps> = ({pageNumber}) => {
    const fullEmployeeArray = useAppSelector(state => state.employees.employeeArray);

    const [displayEmployeeArray, setDisplayEmployeeArray] = useState([] as EmployeeDataModel[]);

    useEffect(() => {
        setDisplayEmployeeArray(filterDisplayEmployeeArray(fullEmployeeArray, pageNumber));
    }, [fullEmployeeArray, pageNumber]);

    return (
        <div className={classes.employeeListContainer}>
            {
                displayEmployeeArray.map(employee => <EmployeeCard employee={employee} key={employee.id} />)
            }
        </div>
    );
};

export default EmployeeList;