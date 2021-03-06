import {Handler} from './handler';
import {https} from 'firebase-functions';
import * as express from 'express';
import {PathMatcher} from './path-matcher';

export class GetUnionHandler implements Handler, PathMatcher {
    // private unionsService: UnionsRepo
    //
    // constructor(unionsService: UnionsRepo) {
    //     this.unionsService = unionsService;
    // }

    handle(req: https.Request, resp: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    match(path: string): boolean {
        return false;
    }

}
