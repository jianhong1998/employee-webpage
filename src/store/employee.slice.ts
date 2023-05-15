import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import EmployeeDataModel from "../models/employeeData.model";

interface EmployeeState {
    employeeArray: EmployeeDataModel[];
    totalEmployee: number;
}

const initialEmployeeState: EmployeeState = {
    employeeArray: [] as EmployeeDataModel[],
    totalEmployee: 0
};

const addEmployee = (state: EmployeeState, action: PayloadAction<EmployeeDataModel>) => {
    const employee = action.payload;
    
    state.employeeArray.push(employee);
};

const editEmployee = (state: EmployeeState, action: PayloadAction<EmployeeDataModel>) => {
    const { id, name, salary, department } = action.payload;

    state.employeeArray = state.employeeArray.map(employee => {
        if (employee.id === id) {
            employee.name = name;
            employee.salary = salary;
            employee.department = department;
        }

        return employee;
    });
};

const deleteEmployee = (state: EmployeeState, action: PayloadAction<{employeeId: number}>) => {
    const { employeeId } = action.payload;
    
    state.employeeArray = state.employeeArray.filter(employee => employee.id !== employeeId);
};



const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: initialEmployeeState,
    reducers: {
        addEmployee,
        editEmployee,
        deleteEmployee
    }
});

const employeeActions = employeeSlice.actions;

export default employeeSlice;
export {
    employeeActions
};