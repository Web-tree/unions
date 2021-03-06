import * as functions from 'firebase-functions';
import {AuthService} from './auth/auth.service';
import {UnionsRepo} from './unions/unions.repo';
import {RequestService} from './request/request.service';
import * as NodeCache from 'node-cache';
import {Union} from '@webtree/unions-common/lib/model/union';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {isHttpError} from './errors/http.error';
import {ApiKeysService} from "./keys/api-keys-service";

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

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.put('/', async (req, res) => {
    try {
        const union = req.body as Union;
        const user = await authService.getUser(requestService.getToken(req));
        res.send(await unionsRepo.put(user.id, union));
    } catch (e) {
        handleError(e, res);
    }
});

app.get('/:unionId', async (req, res) => {
    try {
        const union = await unionsRepo.get(req.params.unionId);
        res.status(200).send(union);
    } catch (e) {
        handleError(e, res);
    }
});
app.get('/', async (req, res) => {
    try {
        const user = await authService.getUser(requestService.getToken(req));
        const unionList = await unionsRepo.listUnionsByOwner(user.id);
        res.status(200).send(unionList);
    } catch (e) {
        handleError(e, res);
    }
});
app.delete('/:unionId', async (req, res) => {
    try {
        if (await isUnionOwner(req.params.unionId, req, res)) {
            await unionsRepo.delete(req.params.unionId);
            res.status(200).send();
        }
    } catch (e) {
        handleError(e, res);
    }
});

app.post('/:unionId/generateApiKeys', async (req, res) => {
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

app.get('/:unionId/getApiKeys', async (req, res) => {
    try {
        const unionId = req.params.unionId;
        if (await isUnionOwner(unionId, req, res)) {
            res.status(200).send(await apiKeyService.getUnionsKeys(unionId));
        }
    } catch (e) {
        handleError(e, res);
    }
});

app.delete('/apiKeys/:appId', async (req, res) => {
    try {
        const appId = req.params.appId;
        const unionId = await apiKeyService.getUnionIdByAppId(appId);
        console.log(unionId);
        if (await isUnionOwner(unionId, req, res)) {
            await apiKeyService.delete(appId);
            res.status(200).send();
        }
    } catch (e) {
        handleError(e, res);
    }
});
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

function handleError(e: any, res: express.Response) {
    if (isHttpError(e)) {
        res.status(e.code).send(e.message);
    } else if (e.error.statusCode && e.error.statusMessage) {
        res.status(e.error.statusCode).send(e.error.statusMessage);
    } else {
        functions.logger.error(e);
        res.status(500).send(e);
    }
}

export const unions = functions
    .region('europe-west1')
    .https
    .onRequest(main);
