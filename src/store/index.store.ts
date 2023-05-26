import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './employee.slice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import errorPopupSlice from './errorPopup.slice';
import employeeFormSlice from './employeeForm.slice';
import appHeaderSlice from './appHeader.slice';
import loadingSlice from './loading.slice';
import deletePopupSlice from './deletePopup.slice';
import userFormSlice from './userForm.slice';
import loggedInUserSlice from './loggedInUser.slice';
import logoutPopupSlice from './logoutPopup.slice';

const indexStore = configureStore({
    reducer: {
        employees: employeeSlice.reducer,
        errorPopup: errorPopupSlice.reducer,
        deletePopup: deletePopupSlice.reducer,
        updateEmployeeForm: employeeFormSlice.reducer,
        appTitle: appHeaderSlice.reducer,
        loading: loadingSlice.reducer,
        userForm: userFormSlice.reducer,
        loggedInUser: loggedInUserSlice.reducer,
        logoutPopup: logoutPopupSlice.reducer
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