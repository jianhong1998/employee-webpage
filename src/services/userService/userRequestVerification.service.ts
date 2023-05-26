export default class UserRequestVerificationService {
    public static verifyUsername(username: string): boolean {
        return (
            username.length >= 5 &&
            username.split(' ').length === 1
        );
    }

    public static verifyPassword(password: string): boolean {
        return (
            password.length <= 20 &&
            password.length >= 8 &&
            password.split(' ').length === 1
        );
    }
}