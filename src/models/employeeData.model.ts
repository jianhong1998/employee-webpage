import DepartmentType from "./departmentType.enum";

export default interface EmployeeDataModel {
    id: number;
    name: string;
    department: DepartmentType;
    salary: number;
}