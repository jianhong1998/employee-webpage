import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import InputData from "../models/inputState.model";
import DepartmentType from "../models/departmentType.enum";


interface EmployeeFormState {
    idInputData: InputData<number>;
    nameInputData: InputData<string>;
    salaryInputData: InputData<string>;
    departmentInputData: InputData<DepartmentType | undefined>;
}

const initialEmployeeFormState: EmployeeFormState = {
    idInputData: {
        dataValue: -1,
        errorMessage: undefined
    },
    nameInputData: {
        dataValue: "",
        errorMessage: undefined
    },
    salaryInputData: {
        dataValue: "",
        errorMessage: undefined
    },
    departmentInputData: {
        dataValue: undefined,
        errorMessage: undefined
    }
};

const updateId = (state: EmployeeFormState, action: PayloadAction<InputData<number>>) => {
    state.idInputData.dataValue = action.payload.dataValue;
    state.idInputData.errorMessage = action.payload.errorMessage;
}

const updateName = (state: EmployeeFormState, action: PayloadAction<InputData<string>>) => {
    state.nameInputData.dataValue = action.payload.dataValue;
    state.nameInputData.errorMessage = action.payload.errorMessage;
};

const updateSalary = (state: EmployeeFormState, action: PayloadAction<InputData<string>>) => {
    state.salaryInputData.dataValue = action.payload.dataValue;
    state.salaryInputData.errorMessage = action.payload.errorMessage;
};

const updateDepartment = (state: EmployeeFormState, action: PayloadAction<InputData<DepartmentType | undefined>>) => {
    state.departmentInputData.dataValue = action.payload.dataValue;
    state.departmentInputData.errorMessage = action.payload.errorMessage;
};

const clear = (state: EmployeeFormState) => {
    state.departmentInputData.dataValue = undefined;
    state.departmentInputData.errorMessage = undefined;
    state.nameInputData.dataValue = "";
    state.nameInputData.errorMessage = undefined;
    state.salaryInputData.dataValue = "";
    state.salaryInputData.errorMessage = undefined;
    state.idInputData.dataValue = -1;
    state.idInputData.errorMessage = undefined;
};

const employeeFormSlice = createSlice({
    name: 'employeeFormSlice',
    initialState: initialEmployeeFormState,
    reducers: {
        updateId,
        updateName,
        updateSalary,
        updateDepartment,
        clear
    }
});

const employeeFormActions = employeeFormSlice.actions;

export {
    employeeFormActions
};

export default employeeFormSlice;