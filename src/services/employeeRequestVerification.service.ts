export default class EmployeeRequestVerification {
    static verifyName(name: string): boolean {
        return name.length >= 4 && name.length <= 30;
    }
}