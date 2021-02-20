import {https} from 'firebase-functions';
import {Response} from 'express';

export interface Handler {
    handle(req: https.Request, resp: Response): Promise<void>
}
