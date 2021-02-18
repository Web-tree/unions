import * as functions from 'firebase-functions';
import {AuthService} from './auth/auth.service';
import {UnionsService} from './unions/unions.service';
import {RequestService} from './request/request.service';
import * as NodeCache from 'node-cache';
import {Union} from '@webtree/unions-common/lib/model/union';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {isHttpError} from './errors/http.error';

admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
const cors = require('cors');

main.use('/api/v0', app);
main.use(bodyParser.json());
const userCache = new NodeCache();

const authService = new AuthService(userCache);
const unionsService = new UnionsService();
const requestService = new RequestService();

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.put('/', async (req, res) => {
    try {
        const union = req.body as Union;
        const user = await authService.getUser(requestService.getToken(req));
        res.send(await unionsService.put(user.id, union));
    } catch (e) {
        handleError(e, res);
    }
});

app.get('/:unionId', async (req, res) => {
    try {
        const union = await unionsService.get(req.params.unionId);
        res.status(200).send(union);
    } catch (e) {
        handleError(e, res);
    }
});
app.get('/', async (req, res) => {
    try {
        const user = await authService.getUser(requestService.getToken(req));
        const unionList = await unionsService.listUnionsByOwner(user.id);
        res.status(200).send(unionList);
    } catch (e) {
        handleError(e, res)
    }
})

function handleError(e: any, res: express.Response) {
    if (isHttpError(e)) {
        res.status(e.code).send(e.message);
    } else {
        functions.logger.error(e);
        res.status(500).send(e);
    }
}

export const unions = functions
    .region('europe-west1')
    .https
    .onRequest(main);
