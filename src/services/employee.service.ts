import EmployeeDataModel from "../models/employeeData.model";
import HttpRequestMethod from "../models/httpRequestMethod.enum";
import NewEmployeeDataModel from "../models/newEmployeeData.model";
import { employeeActions } from "../store/employee.slice";
import { AppDispatch } from "../store/index.store";
import { loadingActions } from "../store/loading.slice";

export default class EmployeeService {
    static idRunning = 0;
    
    private static async sendEmployeeRequest(
        data: {
            employee?: EmployeeDataModel,
            newEmployee?: NewEmployeeDataModel,
            employeeId?: number
        } | undefined,
        method: HttpRequestMethod
    ): Promise<EmployeeDataModel | void> {
        return new Promise((resolve, reject) => {
            switch (method) {
                case HttpRequestMethod.GET:
                    break;
                case HttpRequestMethod.POST:
                    setTimeout(() => {
                        this.idRunning++;
                        
                        if (typeof data === "undefined" || typeof  data.newEmployee === "undefined") {
                            reject('Data must include newEmployee.');
                            return;
                        }

                        const createdEmployee: EmployeeDataModel = {
                            id: this.idRunning,
                            name: data.newEmployee.name,
                            department: data.newEmployee.department,
                            salary: data.newEmployee.salary
                        };
                        
                        resolve(createdEmployee);
                    }, 2000);
                    break;
                case HttpRequestMethod.PUT:
                    setTimeout(() => {
                        if (typeof data === "undefined" || typeof data.employee === "undefined") {
                            reject('Data must include employee.');
                            return;
                        }

                        resolve(data.employee);
                    }, 2000);
                    break;
                case HttpRequestMethod.DELETE:
                    setTimeout(() => {
                        if (typeof data === 'undefined' || typeof data.employeeId === 'undefined') {
                            reject('Data must include employeeId');
                            return;
                        }
                        
                        resolve();
                    }, 2000);
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
    
                const result = await this.sendEmployeeRequest({employee}, HttpRequestMethod.PUT);
    
                dispatch(loadingActions.inactiveLoading());

                if (typeof result === "undefined") {
                    throw new Error('Request result is undefined or void.');
                }

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
    
                const result = await this.sendEmployeeRequest({newEmployee}, HttpRequestMethod.POST);
    
                dispatch(loadingActions.inactiveLoading());

                if (typeof result === "undefined") {
                    throw new Error('Request result is undefined or void.');
                }

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

                await this.sendEmployeeRequest({employeeId}, HttpRequestMethod.DELETE);

                dispatch(loadingActions.inactiveLoading());

                dispatch(employeeActions.deleteEmployee({employeeId}));
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }
}