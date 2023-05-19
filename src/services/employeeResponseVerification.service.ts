import DepartmentType from "../models/departmentType.enum";
import EmployeeDataModel from "../models/employeeData.model";
import ErrorRespomseBody from "../models/responseModels/errorResponseBody.model";

export default class EmployeeResponseVerification {
    public static isError(response: unknown): response is ErrorRespomseBody {
        return (
            typeof response === 'object' &&
            response !== null &&
            'errorMessage' in response &&
            typeof response.errorMessage === 'string'
        );
    }

    public static isEmployeeDataModel(response: unknown): response is EmployeeDataModel {
        if (
            typeof response !== 'object' ||
            response === null
        ) {
            return false;
        }
        
        if (
            !('department' in response) ||
            typeof response.department !== 'string'
        ) {
            return false;
        }

        const departmentTypeValueArray = Object.values(DepartmentType);

        for (let i = 0 ; i < departmentTypeValueArray.length ; i++) {
            if (response.department === departmentTypeValueArray[i]) {
                break;
            } else if (i === departmentTypeValueArray.length - 1) {
                return false;
            }
        }
        
        return (
            'id' in response &&
            'name' in response &&
            'salary' in response &&
            typeof response.id === 'number' &&
            typeof response.name === 'string' &&
            typeof response.salary === 'number'
        )
    }

    public static isEmployeeDataModelArray(response: unknown): response is EmployeeDataModel {
        if (!Array.isArray(response)) {
            return false;
        }

        if (response.length === 0) {
            return true;
        }

        return this.isEmployeeDataModel(response[0]);
    }
}