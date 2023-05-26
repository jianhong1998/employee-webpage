import ResponseTokenObject from "../../models/token/ResponseTokenObject.model";
import ResponseUser from "../../models/userModels/responseUser.model";

export default class UserResponseVerificationService {
    public static isResponseUser(response: unknown): response is ResponseUser {
        return (
            typeof response === 'object' &&
            response !== null &&
            'userId' in response &&
            'username' in response &&
            'departmentId' in response &&
            typeof response.userId === 'string' &&
            typeof response.username === 'string' &&
            typeof response.departmentId === 'number'
        );
    }

    public static isTokenResponse(response: unknown): response is ResponseTokenObject {
        return (
            typeof response === 'object' &&
            response !== null &&
            'token' in response &&
            typeof response.token === 'string'
        );
    }
}