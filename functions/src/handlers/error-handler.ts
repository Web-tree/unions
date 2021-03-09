import {isHttpError} from '../errors/http.error';
import * as functions from 'firebase-functions';

export function handleError(e: any, res: any) {
    functions.logger.error(e);
    if (isHttpError(e)) {
        res.status(e.code).send(e.message);
    } else if (e.error && e.error.statusCode && e.error.statusMessage) {
        res.status(e.error.statusCode).send(e.error.statusMessage);
    } else {
        res.status(500).send(e);
    }
}
