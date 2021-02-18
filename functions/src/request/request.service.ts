import {UnauthorizedError} from '../errors/http.error';

export class RequestService {
    public getToken(request: any): string {
        const token = request.header('Authorization') as string;
        if (token === '' || token === 'undefined' || token === undefined) {
            throw new UnauthorizedError('Missed Authorization header');
        }
        return token;
    }
}
