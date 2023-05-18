import { createSlice } from "@reduxjs/toolkit";

interface LoadingSliceState {
    loadingStatus: boolean;
}

const initialLoadingSliceState: LoadingSliceState = {
    loadingStatus: false
};

const activeLoading = (state: LoadingSliceState) => {
    state.loadingStatus = true;
};

const inactiveLoading = (state: LoadingSliceState) => {
    state.loadingStatus = false;
};

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: initialLoadingSliceState,
    reducers: {
        activeLoading,
        inactiveLoading
    }
});

const loadingActions = loadingSlice.actions;

export {
    loadingActions
};
export default loadingSlice;