import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PopupData from "../models/popupData.model";



export interface PopupState extends PopupData {
    openState: boolean;
}

const initialPopupState: PopupState = {
    openState: false,
    title: null,
    content: null,
    processButton: null
}

const openPopup = (state: PopupState, action: PayloadAction<PopupData>) => {
    const { title, content, processButton } = action.payload;

    state.title = title;
    state.content = content;
    state.processButton = processButton;
    state.openState = true;
};

const closePopup = (state: PopupState) => {
    state.content = null;
    state.processButton = null;
    state.title = null;
    state.openState = false;
};

const popupSlice = createSlice({
    name: "popupSlice",
    initialState: initialPopupState,
    reducers: {
        openPopup,
        closePopup
    }
});

const popupActions = popupSlice.actions;

export default popupSlice;

export {
    popupActions
}