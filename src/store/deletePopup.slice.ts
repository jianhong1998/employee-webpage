import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorPopupState } from "./errorPopup.slice";
import PopupData from "../models/popupData.model";

interface DeletePopupState extends ErrorPopupState {
    employeeId: number | undefined;
}

const initialDeletePopupState: DeletePopupState = {
    employeeId: undefined,
    openState: false,
    title: null,
    content: null
};

const openPopup = (
    state: DeletePopupState,
    action: PayloadAction<{
        popupData: PopupData,
        employeeId: number
    }>
) => {
    const { title, content } = action.payload.popupData;
    const employeeId = action.payload.employeeId;

    state.employeeId = employeeId;
    state.title = title;
    state.content = content;
    state.openState = true;
};

const closePopup = (state: DeletePopupState) => {
    state.openState = false;
    state.content = null;
    state.title = null;
    state.employeeId = undefined;
};

const deletePopupSlice = createSlice({
    name: 'deletePopupSlice',
    initialState: initialDeletePopupState,
    reducers: {
        openPopup,
        closePopup
    }
});

const deletePopupActions = deletePopupSlice.actions;

export {
    deletePopupActions
}

export default deletePopupSlice;