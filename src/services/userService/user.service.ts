import LoginUser from "../../models/userModels/loginUser.model";
import RegisterUser from "../../models/userModels/registerUser.model";
import { errorPopupActions } from "../../store/errorPopup.slice";
import { AppDispatch } from "../../store/index.store";
import { loadingActions } from "../../store/loading.slice";
import { loggedInUserActions } from "../../store/loggedInUser.slice";
import { userFormActions } from "../../store/userForm.slice";
import TokenHandler from "../tokenService/tokenHandler.service";
import UserRequestHandler from "./userRequestHandler";

export default class UserService {
    public static registerUser(user: RegisterUser) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());

                await UserRequestHandler.registerUserRequestHandler(user);

                dispatch(loadingActions.inactiveLoading());

                dispatch(errorPopupActions.openPopup({
                    title: 'Successfully Register User',
                    content: 'User has been registered successfully. You can login by using the registered user now.'
                }));

                dispatch(userFormActions.clear());
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        }
    }

    public static loginUser(user: LoginUser) {
        return async (dispatch: AppDispatch) => {
            try {
                dispatch(loadingActions.activeLoading());
                
                const { token } = await UserRequestHandler.loginUserRequestHandler(user);

                const { userId, username, departmentId } = TokenHandler.decodeToken(token);

                TokenHandler.setToken(token);

                dispatch(loggedInUserActions.setLoggedInUserState({
                    token: token,
                    user: {
                        userId,
                        username,
                        departmentId
                    }
                }));

                dispatch(userFormActions.clear());
                dispatch(loadingActions.inactiveLoading());
            } catch (error) {
                dispatch(loadingActions.inactiveLoading());
                return Promise.reject(error);
            }
        };
    }
}