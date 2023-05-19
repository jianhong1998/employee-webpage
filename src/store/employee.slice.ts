import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import EmployeeDataModel from "../models/employeeData.model";

interface EmployeeState {
    employeeArray: EmployeeDataModel[];
    totalEmployee: number;
    pageIndex: number;
}

const initialEmployeeState: EmployeeState = {
    employeeArray: [] as EmployeeDataModel[],
    totalEmployee: 0,
    pageIndex: 0
};

const initialEmployeeArray = (state: EmployeeState, action: PayloadAction<EmployeeDataModel[]>) => {
    const employeeArray = action.payload;

    state.employeeArray = employeeArray;
    state.totalEmployee = employeeArray.length;
}

const addEmployee = (state: EmployeeState, action: PayloadAction<EmployeeDataModel>) => {
    const employee = action.payload;
    
    state.employeeArray.push(employee);
    state.totalEmployee = state.employeeArray.length;
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

    state.totalEmployee = state.employeeArray.length;
};

const deleteEmployee = (state: EmployeeState, action: PayloadAction<{employeeId: number}>) => {
    const { employeeId } = action.payload;
    
    state.employeeArray = state.employeeArray.filter(employee => employee.id !== employeeId);

    state.totalEmployee = state.employeeArray.length;

    if (state.totalEmployee < (state.pageIndex + 1) * 10 - 9) {
        state.pageIndex--;
    }
};

const nextPage = (state: EmployeeState) => {
    if (state.pageIndex === Math.floor(state.totalEmployee / 10)) {
        return;
    }
    
    state.pageIndex++;
};

const previousPage = (state: EmployeeState) => {
    if (state.pageIndex === 0) {
        return;
    }
    
    state.pageIndex--;
};



const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: initialEmployeeState,
    reducers: {
        initialEmployeeArray,
        addEmployee,
        editEmployee,
        deleteEmployee,
        nextPage,
        previousPage
    }
});

const employeeActions = employeeSlice.actions;

export default employeeSlice;
export {
    employeeActions
};