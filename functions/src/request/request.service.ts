import {https} from 'firebase-functions';
import {UnauthorizedError} from '../errors/http.error';

export class RequestService {
    public getToken(request: https.Request): string {
        const token = request.header('Authorization') as string;
        if (token === '' || token === 'undefined' || token === undefined) {
            throw new UnauthorizedError('Missed Authorization header');
        }
        return token;
    }
}
