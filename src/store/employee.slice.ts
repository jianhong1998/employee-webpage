import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import EmployeeDataModel from "../models/employeeData.model";

interface EmployeeState {
    employeeMap: Map<number, EmployeeDataModel>;
    totalEmployee: number;
}

const addEmployee = (state: EmployeeState, action: PayloadAction<EmployeeDataModel>) => {
    const employee = action.payload;
    
    state.employeeMap = state.employeeMap.set(employee.id, employee);
    state.totalEmployee = state.employeeMap.size;
};

const editEmployee = (state: EmployeeState, action: PayloadAction<EmployeeDataModel>) => {
    const inputEmployee = action.payload;

    state.employeeMap = state.employeeMap.set(inputEmployee.id, inputEmployee);
    state.totalEmployee = state.employeeMap.size;
};

const deleteEmployee = (state: EmployeeState, action: PayloadAction<{employeeId: number}>) => {
    const { employeeId } = action.payload;
    
    state.employeeMap.delete(employeeId);
    state.totalEmployee = state.employeeMap.size;
};



const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: {
        employeeMap: new Map<number, EmployeeDataModel>(),
        totalEmployee: 0
    } as EmployeeState,
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