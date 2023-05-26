import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ResponseUser from "../models/userModels/responseUser.model";

interface LoggedInUserState {
    token: string | null;
    user: ResponseUser |  undefined;
}

const initialLoggedInUserState: LoggedInUserState = {
    token: null,
    user: undefined
};

const setLoggedInUserState = (state: LoggedInUserState, action: PayloadAction<{token: string, user: ResponseUser}>) => {
    state.token = action.payload.token;
    state.user = action.payload.user;
};

const clearLoggedInUserState = (state: LoggedInUserState) => {
    state.token = null;
    state.user = undefined;
}

const loggedInUserSlice = createSlice({
    name: 'loggedInUserSlice',
    initialState: initialLoggedInUserState,
    reducers: {
        setLoggedInUserState,
        clearLoggedInUserState
    }
});

const loggedInUserActions = loggedInUserSlice.actions;

export {
    loggedInUserActions
}
export default loggedInUserSlice;