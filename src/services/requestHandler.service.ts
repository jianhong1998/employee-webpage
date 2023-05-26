import EmployeeDataModel from "../models/employeeData.model";
import HttpRequestMethod from "../models/httpRequestMethod.enum";
import NewEmployeeDataModel from "../models/newEmployeeData.model";
import ServerConfig from "./serverConfig.service";
import EmployeeResponseVerification from "./employeeResponseVerification.service";
import TokenHandler from "./tokenService/tokenHandler.service";

export default class RequestHandler {
    public static async getAllEmployeesRequest (): Promise<EmployeeDataModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let employeeArray: EmployeeDataModel[] = [];
        
                const backendUrl = ServerConfig.backendUrl;

                const token = TokenHandler.getToken();
        
                const response = await fetch(`${backendUrl}/api/employee`, {
                    method: HttpRequestMethod.GET,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    TokenHandler.clearToken();
                    throw new Error('Token is expired.');
                }

                const result = (await response.json()) as {employees: EmployeeDataModel[]};

                employeeArray = result.employees;

                resolve(employeeArray);
            } catch (error) {
                let errorMessage: string;

                if (error instanceof Error) {
                    errorMessage = error.message
                } else {
                    errorMessage = String(error);
                }

                reject(errorMessage);
            }
        });
    }

    public static async postEmployeeRequest(newEmployee: NewEmployeeDataModel): Promise<EmployeeDataModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const requestBody = newEmployee;
                const { isEmployeeDataModel, isError } = EmployeeResponseVerification;
                const url = `${ServerConfig.backendUrl}/api/employee`;

                if (requestBody.name.length < 4 || requestBody.name.length > 30) {
                    throw new Error('Name must be minimum 4 characters and maximum 30 characters.');
                }

                const token = TokenHandler.getToken();

                const response = await fetch(url, {
                    method: HttpRequestMethod.POST,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.status === 401) {
                    TokenHandler.clearToken();
                    throw new Error('Token is expired.');
                }

                const result = await response.json();

                if (isError(result)) {
                    throw new Error(result.errorMessage);
                }

                if (!isEmployeeDataModel(result)) {
                    throw new Error('Response in postEmployeeRequest is invalid.');
                }

                resolve(result);
            } catch (error) {
                let errorMessage: string;

                if (error instanceof Error) {
                    errorMessage = error.message
                } else {
                    errorMessage = String(error);
                }

                reject(errorMessage);
            }
        });
    }

    public static async putEmployeeRequest(employee: EmployeeDataModel): Promise<EmployeeDataModel> {
        return new Promise(async (resolve , reject) => {
            try {
                const { id, name, department, salary } = employee;
                
                const requestBody = {
                    name,
                    department,
                    salary
                };

                const { isEmployeeDataModel, isError } = EmployeeResponseVerification;

                const url = `${ServerConfig.backendUrl}/api/employee/${id}`;

                if (requestBody.name.length < 4 || requestBody.name.length > 30) {
                    throw new Error('Name must be minimum 4 characters and maximum 30 characters.');
                }

                const token = TokenHandler.getToken();

                const response = await fetch(url, {
                    method: HttpRequestMethod.PUT,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.status === 401) {
                    TokenHandler.clearToken();
                    throw new Error('Token is expired.');
                }

                if (response.status === 304) {
                    throw new Error('Employee data is no change.');
                }

                const result = await response.json();

                if (isError(result)) {
                    throw new Error(result.errorMessage);
                }

                if (!isEmployeeDataModel(result)) {
                    throw new Error('Response in putEmployeeRequest is invalid.');
                }

                resolve(result);
            } catch (error) {
                let errorMessage: string;

                if (error instanceof Error) {
                    errorMessage = error.message
                } else {
                    errorMessage = String(error);
                }

                reject(errorMessage);
            }
        });
    }

    public static async deleteEmployeeRequest(employeeId: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = `${ServerConfig.backendUrl}/api/employee/${employeeId}`;

                const { isError } = EmployeeResponseVerification;
                
                const token = TokenHandler.getToken();

                const response = await fetch(url, {
                    method: HttpRequestMethod.DELETE,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    TokenHandler.clearToken();
                    throw new Error('Token is expired.');
                }

                if (response.status === 204) {
                    resolve();
                    return;
                }
                
                const result = await response.json();

                if (!isError(result)) {
                    throw new Error('Response in deleteEmployeeRequest is invalid.');
                }

                throw new Error(result.errorMessage);
            } catch(error) {
                let errorMessage: string;
    
                if (error instanceof Error) {
                    errorMessage = error.message
                } else {
                    errorMessage = String(error);
                }
    
                reject(errorMessage);
            }
        });
    }
}