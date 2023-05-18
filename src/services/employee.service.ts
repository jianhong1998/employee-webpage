import EmployeeDataModel from "../models/employeeData.model";
import HttpRequestMethod from "../models/httpRequestMethod.enum";
import { employeeActions } from "../store/employee.slice";
import { AppDispatch } from "../store/index.store";
import { loadingActions } from "../store/loading.slice";

export default class EmployeeService {
    private static async sendEmployeeRequest(employee: EmployeeDataModel, method: HttpRequestMethod): Promise<EmployeeDataModel> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Server Something Went Wrong.');
            }, 2000);
        });
    }
    
    static updateEmployee(employee: EmployeeDataModel) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());
    
                const result = await this.sendEmployeeRequest(employee, HttpRequestMethod.PUT);
    
                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.editEmployee(result));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }
}