import EmployeeDataModel from "../models/employeeData.model";
import HttpRequestMethod from "../models/httpRequestMethod.enum";
import NewEmployeeDataModel from "../models/newEmployeeData.model";
import { employeeActions } from "../store/employee.slice";
import { AppDispatch } from "../store/index.store";
import { loadingActions } from "../store/loading.slice";

export default class EmployeeService {
    static idRunning = 0;
    
    private static async sendEmployeeRequest(employee: EmployeeDataModel | NewEmployeeDataModel, method: HttpRequestMethod): Promise<EmployeeDataModel> {
        return new Promise((resolve, reject) => {
            switch (method) {
                case HttpRequestMethod.GET:
                    break;
                case HttpRequestMethod.POST:
                    setTimeout(() => {
                        this.idRunning++;
        
                        const createdEmployee: EmployeeDataModel = {
                            id: this.idRunning,
                            name: employee.name,
                            department: employee.department,
                            salary: employee.salary
                        };
                        
                        resolve(createdEmployee);
                    }, 2000);
                    break;
                case HttpRequestMethod.PUT:
                    setTimeout(() => {
                        reject('Server Something Went Wrong.');
                    }, 2000);
                    break;
                case HttpRequestMethod.DELETE:
                    break;
                default:
                    break;
            }
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

    static createEmployee(newEmployee: NewEmployeeDataModel) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());
    
                const result = await this.sendEmployeeRequest(newEmployee, HttpRequestMethod.POST);
    
                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.addEmployee(result));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }
}