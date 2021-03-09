import * as functions from 'firebase-functions';
import {AuthService} from './auth/auth.service';
import {UnionsRepo} from './unions/unions.repo';
import {RequestService} from './request/request.service';
import NodeCache from 'node-cache';
import {Union} from '@webtree/unions-common/lib/model/union';
import * as admin from 'firebase-admin';
import express from 'express';
import * as bodyParser from 'body-parser';
import {ApiKeysService} from "./keys/api-keys-service";
import {HandlerCreateUnionToUserRelationRequest} from './handlers/request-relation-handler';
import {handleError} from './handlers/error-handler';
import {HandlersConfig} from './handlers/handlers-config';

admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
const cors = require('cors');

main.use('/api/v0', app);
main.use(bodyParser.json());
const userCache = new NodeCache();

const authService = new AuthService(userCache);
const unionsRepo = new UnionsRepo();
const requestService = new RequestService();
const apiKeyService = new ApiKeysService()
const config = new HandlersConfig();

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.put('/', async (req: any, res: any) => {
    try {
        const union = req.body as Union;
        const user = await authService.getUser(requestService.getToken(req));
        res.send(await unionsRepo.put(user.id, union));
    } catch (e) {
        handleError(e, res);
    }
});

app.get('/:unionId', async (req: any, res: any) => {
    try {
        const union = await unionsRepo.get(req.params.unionId);
        res.status(200).send(union);
    } catch (e) {
        handleError(e, res);
    }
});
app.get('/', async (req: any, res: any) => {
    try {
        const user = await authService.getUser(requestService.getToken(req));
        const unionList = await unionsRepo.listUnionsByOwner(user.id);
        res.status(200).send(unionList);
    } catch (e) {
        handleError(e, res);
    }
});
app.delete('/:unionId', async (req: any, res: any) => {
    try {
        if (await isUnionOwner(req.params.unionId, req, res)) {
            await unionsRepo.delete(req.params.unionId);
            res.status(200).send();
        }
    } catch (e) {
        handleError(e, res);
    }
});

app.post('/:unionId/generateApiKeys', async (req: any, res: any) => {
    try {
        const unionId = req.params.unionId;
        if (await isUnionOwner(unionId, req, res)) {
            const keys = await apiKeyService.newKeysForUnion(unionId);
            res.status(200).send(keys);
        }
    } catch (e) {
        handleError(e, res)
    }
});

app.get('/:unionId/getApiKeys', async (req: any, res: any) => {
    try {
        const unionId = req.params.unionId;
        if (await isUnionOwner(unionId, req, res)) {
            res.status(200).send(await apiKeyService.getUnionsKeys(unionId));
        }
    } catch (e) {
        handleError(e, res);
    }
});

app.delete('/apiKeys/:appId', async (req: any, res: any) => {
    try {
        const appId = req.params.appId;
        const unionId = await apiKeyService.getUnionIdByAppId(appId);
        if (await isUnionOwner(unionId, req, res)) {
            await apiKeyService.delete(appId);
            res.status(200).send();
        }
    } catch (e) {
        handleError(e, res);
    }
});

app.post('/:unionId/requestInvite', new HandlerCreateUnionToUserRelationRequest(config).handle);

async function isUnionOwner(unionId: string, req: any, res: any): Promise<boolean> {
    const userPromise = authService.getUser(requestService.getToken(req));
    const unionPromise = unionsRepo.get(unionId);
    await Promise.all([userPromise, unionPromise]);
    const user = await userPromise;
    const union = await unionPromise;
    console.log(user, union, unionId)

    if (!user || !union || user.id !== union.owner) {
        res.status(403).send("You're not authorized to modify this union");
        return false;
    }
    return true;
}

export const unions = functions
    .region('europe-west1')
    .https
    .onRequest(main);
