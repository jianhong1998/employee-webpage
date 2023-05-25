import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserFormState {
    username: string;
    password: string;
    department: number;
}

const initialUserFormState: UserFormState = {
    username: '',
    password: '',
    department: -1
};

const setUsername = (state: UserFormState, action: PayloadAction<string>) => {
    state.username = action.payload;
};


const setPassword = (state: UserFormState, action: PayloadAction<string>) => {
    if (action.payload.length >= 20) return;

    state.password = action.payload;
};

const setDepartment = (state: UserFormState, action: PayloadAction<number>) => {
    state.department = action.payload;
};

const clear = (state: UserFormState) => {
    state.department = -1;
    state.password = '';
    state.username = '';
}

const userFormSlice = createSlice({
    name: 'userFormSlice',
    initialState: initialUserFormState,
    reducers: {
        setDepartment,
        setPassword,
        setUsername,
        clear
    }
});

const userFormActions = userFormSlice.actions;

export {
    userFormActions
};

export default userFormSlice;