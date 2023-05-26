import { createSlice } from "@reduxjs/toolkit";

interface LogoutPopupState {
    openState: boolean;
}

const initialLogoutPopupState: LogoutPopupState = {
    openState: false
}

const openPopup = (state: LogoutPopupState) => {
    state.openState = true;
};

const closePopup = (state: LogoutPopupState) => {
    state.openState = false;
};

const logoutPopupSlice = createSlice({
    name: 'logoutPopupSlice',
    initialState: initialLogoutPopupState,
    reducers: {
        openPopup,
        closePopup
    }
});

const logoutPopupSliceAction = logoutPopupSlice.actions;

export {
    logoutPopupSliceAction
}

export default logoutPopupSlice;