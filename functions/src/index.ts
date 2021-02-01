import * as functions from 'firebase-functions';
import {AuthService} from './auth/auth.service';
import {UnionsService} from './unions/unions.service';
import {transformAndValidateSync} from 'class-transformer-validator';
import {RequestService} from './request/request.service';
import * as NodeCache from 'node-cache';
import {isHttpError} from './errors/http.error';
import {Union} from '@webtree/unions-common/lib/model/union';
import {isValidationError} from '@webtree/unions-common/lib/validators/validate';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const userCache = new NodeCache();
const authService = new AuthService(userCache);
const unionsService = new UnionsService();
const requestService = new RequestService();

export const createUnion = functions
    .region('europe-west1')
    .https
    .onRequest(async (request, response) => {
        response.set('Access-Control-Allow-Origin', '*');
        try {
            switch (request.method) {
                case 'OPTIONS':
                    response.set('Access-Control-Allow-Methods', 'GET, PUT');
                    response.set('Access-Control-Allow-Headers', '*');
                    response.set('Access-Control-Max-Age', '3600');
                    response.status(204).send('');
                    break;
                case 'PUT':
                    const union: Union = transformAndValidateSync(Union, request.body as object, {validator: {groups: ['put']}});
                    const user = await authService.getUser(requestService.getToken(request))
                    response.send(await unionsService.put(user.id, union));
                    break;
                default:
                    response.status(405).send('Method not allowed')
            }
        } catch (e) {
            if (isHttpError(e)) {
                response.status(e.code).send(e.message);
            } else if (isValidationError(e)) {
                response.status(400).send(e);
            } else {
                functions.logger.error(e);
                response.status(500).send(e);
            }
        }
    });
