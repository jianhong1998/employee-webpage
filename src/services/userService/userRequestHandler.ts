import HttpRequestMethod from "../../models/httpRequestMethod.enum";
import ResponseTokenObject from "../../models/token/ResponseTokenObject.model";
import LoginUser from "../../models/userModels/loginUser.model";
import RegisterUser from "../../models/userModels/registerUser.model";
import ResponseUser from "../../models/userModels/responseUser.model";
import EmployeeResponseVerification from "../employeeResponseVerification.service";
import ServerConfig from "../serverConfig.service";
import UserRequestVerificationService from "./userRequestVerification.service";
import UserResponseVerificationService from "./userResponseVerification.service";

export default class UserRequestHandler {
    public static async registerUserRequestHandler(user: RegisterUser): Promise<ResponseUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = `${ServerConfig.backendUrl}/api/user`;
                
                if (!UserRequestVerificationService.verifyUsername(user.username)) {
                    throw new Error('Username must be at least 5 characters with no spaces.');
                }

                if (!UserRequestVerificationService.verifyPassword(user.password)) {
                    throw new Error('Password must be 8-20 characters with no spaces.');
                }

                const response = await fetch(url, {
                    method: HttpRequestMethod.POST,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const result = await response.json();

                const { isError } = EmployeeResponseVerification;
                const { isResponseUser } = UserResponseVerificationService;

                if (isError(result)) {
                    throw new Error(result.errorMessage);
                }

                if (!isResponseUser(result)) {
                    throw new Error('Response in registerUserRequestHandler is invalid.');
                }

                resolve(result);
            } catch (error) {
                let errorMessage: string;

                if (error instanceof Error) {
                    errorMessage = error.message;
                } else {
                    errorMessage = String(error);
                }

                reject(errorMessage);
            }
        });
    }

    public static async loginUserRequestHandler(user: LoginUser): Promise<ResponseTokenObject> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = `${ServerConfig.backendUrl}/api/login`;

                const response = await fetch(url, {
                    method: HttpRequestMethod.POST,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const result = await response.json();

                const { isError } = EmployeeResponseVerification;
                const { isTokenResponse } = UserResponseVerificationService;

                if (isError(result)) {
                    throw new Error(result.errorMessage);
                }

                if (!isTokenResponse(result)) {
                    throw new Error('Response in loginUserRequestHandler is invalid.');
                }

                resolve(result);
            } catch (error) {
                let errorMessage: string;

                if (error instanceof Error) {
                    errorMessage = error.message;
                } else {
                    errorMessage = String(error);
                }

                reject(errorMessage);
            }
        });
    }
}