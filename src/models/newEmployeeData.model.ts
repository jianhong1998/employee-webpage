import DepartmentType from "./departmentType.enum";

export default interface NewEmployeeDataModel {
    name: string;
    department: DepartmentType;
    salary: number;
}