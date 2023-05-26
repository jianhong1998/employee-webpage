import DecodedTokenObject from '../../models/token/DecodedTokenObject.model';

export default class ResponseTokenVerificationService {
    public static isDecodedTokenObject(decodedObject: unknown): decodedObject is DecodedTokenObject {
        return (
            typeof decodedObject === 'object' &&
            decodedObject !== null &&
            'userId' in decodedObject &&
            'username' in decodedObject &&
            'departmentId' in decodedObject &&
            'iat' in decodedObject &&
            'exp' in decodedObject &&
            typeof decodedObject.userId === 'string' &&
            typeof decodedObject.username === 'string' &&
            typeof decodedObject.departmentId === 'number' &&
            typeof decodedObject.iat === 'number' &&
            typeof decodedObject.exp === 'number'
        );
    }
}