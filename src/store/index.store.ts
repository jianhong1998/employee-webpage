import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './employee.slice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import popupSlice from './popup.slice';
import updateEmployeeFormSlice from './updateEmployeeForm.slice';
import appHeaderSlice from './appHeader.slice';
import loadingSlice from './loading.slice';

const indexStore = configureStore({
    reducer: {
        employees: employeeSlice.reducer,
        popup: popupSlice.reducer,
        updateEmployeeForm: updateEmployeeFormSlice.reducer,
        appTitle: appHeaderSlice.reducer,
        loading: loadingSlice.reducer
    }
});

export type RootState = ReturnType<typeof indexStore.getState>;
const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;
export type AppDispatch = typeof indexStore.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;

export default indexStore;
export {
    useAppDispatch,
    useAppSelector
};