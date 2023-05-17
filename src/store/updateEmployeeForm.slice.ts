import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import InputData from "../models/inputState.model";
import DepartmentType from "../models/departmentType.enum";


interface UpdateEmployeeFormState {
    nameInputData: InputData<string>,
    salaryInputData: InputData<string>,
    departmentInputData: InputData<DepartmentType | undefined>
}

const initialUpdateEmployeeState: UpdateEmployeeFormState = {
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

const updateName = (state: UpdateEmployeeFormState, action: PayloadAction<InputData<string>>) => {
    state.nameInputData.dataValue = action.payload.dataValue;
    state.nameInputData.errorMessage = action.payload.errorMessage;
};

const updateSalary = (state: UpdateEmployeeFormState, action: PayloadAction<InputData<string>>) => {
    state.salaryInputData.dataValue = action.payload.dataValue;
    state.salaryInputData.errorMessage = action.payload.errorMessage;
};

const updateDepartment = (state: UpdateEmployeeFormState, action: PayloadAction<InputData<DepartmentType | undefined>>) => {
    state.departmentInputData.dataValue = action.payload.dataValue;
    state.departmentInputData.errorMessage = action.payload.errorMessage;
};

const clear = (state: UpdateEmployeeFormState) => {
    state.departmentInputData.dataValue = undefined;
    state.departmentInputData.errorMessage = undefined;
    state.nameInputData.dataValue = "";
    state.nameInputData.errorMessage = undefined;
    state.salaryInputData.dataValue = "";
    state.salaryInputData.errorMessage = undefined;
};

const updateEmployeeFormSlice = createSlice({
    name: 'updateEmployeeFormSlice',
    initialState: initialUpdateEmployeeState,
    reducers: {
        updateName,
        updateSalary,
        updateDepartment,
        clear
    }
});

const updateEmployeeFormActions = updateEmployeeFormSlice.actions;

export {
    updateEmployeeFormActions
};

export default updateEmployeeFormSlice;