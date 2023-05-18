import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PopupData from "../models/popupData.model";



export interface ErrorPopupState extends PopupData {
    openState: boolean;
}

const initialErrorPopupState: ErrorPopupState = {
    openState: false,
    title: null,
    content: null
}

const openPopup = (state: ErrorPopupState, action: PayloadAction<PopupData>) => {
    const { title, content } = action.payload;

    state.title = title;
    state.content = content;
    state.openState = true;
};

const closePopup = (state: ErrorPopupState) => {
    state.content = null;
    state.title = null;
    state.openState = false;
};

const errorPopupSlice = createSlice({
    name: "errorPopupSlice",
    initialState: initialErrorPopupState,
    reducers: {
        openPopup,
        closePopup
    }
});

const errorPopupActions = errorPopupSlice.actions;

export default errorPopupSlice;

export {
    errorPopupActions
}