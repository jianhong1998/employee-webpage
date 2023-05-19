import EmployeeDataModel from "../models/employeeData.model";
import NewEmployeeDataModel from "../models/newEmployeeData.model";
import { employeeActions } from "../store/employee.slice";
import { AppDispatch } from "../store/index.store";
import { loadingActions } from "../store/loading.slice";
import RequestHandler from "./requestHandler.service";

export default class EmployeeService {
    static idRunning = 0;
    
    static updateEmployee(employee: EmployeeDataModel) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());
    
                const result = await RequestHandler.putEmployeeRequest(employee);
    
                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.editEmployee(result));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }

    static createEmployee(newEmployee: NewEmployeeDataModel) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());
    
                const result = await RequestHandler.postEmployeeRequest(newEmployee);
    
                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.addEmployee(result));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }

    static deleteEmployee(employeeId: number) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());

                await RequestHandler.deleteEmployeeRequest(employeeId);

                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.deleteEmployee({employeeId}));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }

    static getAllEmployees() {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());

                const employees = await RequestHandler.getAllEmployeesRequest();

                dispatch(employeeActions.initialEmployeeArray(employees));

                dispatch(loadingActions.inactiveLoading());
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }
}