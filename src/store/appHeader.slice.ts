import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppHeaderSliceState {
    title: string;
}

const initialAppHeaderState: AppHeaderSliceState = {
    title: ''
};

const setTitle = (state: AppHeaderSliceState, action: PayloadAction<{title: string}>) => {
    state.title = action.payload.title;
};

const appHeaderSlice = createSlice({
    name: 'appHeaderSlice',
    initialState: initialAppHeaderState,
    reducers: {
        setTitle
    }
});

const appHeaderAction = appHeaderSlice.actions;

export {
    appHeaderAction
}
export default appHeaderSlice;