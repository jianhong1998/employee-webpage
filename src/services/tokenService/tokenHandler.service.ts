import JwtDecode from 'jwt-decode';
import ResponseTokenVerificationService from './responseTokenVerification.service';
import DecodedTokenObject from '../../models/token/DecodedTokenObject.model';

export default class TokenHandler {
    public static getToken(): string {
        const token = localStorage.getItem('token');

        if (token === null) {
            throw new Error('No token saved in localStorage.');
        }

        return token;
    }

    public static setToken(token: string): void {
        localStorage.setItem('token', token);

        if (localStorage.getItem('token') === null) {
            throw new Error('Token cannot be stored in localStorage. Something went wrong.');
        }
    }

    public static clearToken(): void {
        localStorage.removeItem('token');
    }
    
    public static decodeToken(token: string): DecodedTokenObject {
        const decoded = JwtDecode(token);

        if (!ResponseTokenVerificationService.isDecodedTokenObject(decoded)) {
            throw new Error('Decoded object is not a valid DecodedTokenObject.');
        }

        return decoded;
    }
}