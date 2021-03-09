import {Request, Response} from 'express';
import {ChildType} from '@webtree/unions-common/lib/unions/union-relation-record';
import {HandlersConfig} from './handlers-config';
import {handleError} from './error-handler';

export class HandlerCreateUnionToUserRelationRequest {

    constructor(private config: HandlersConfig) {
    }

    public handle = async (req: Request, res: Response) => {
        try {
            const conf = this.config;
            const [user, union] = await Promise.all([
                conf.authService.getUser(conf.requestService.getToken(req)),
                conf.unionsRepo.get(req.params.unionId),
            ]);
            if (!union) {
                res.status(404).send(`union ${req.params.unionId} not found`);
            }
            if (union.owner === user.id) {
                res.status(403).send('you don\'t need invite in your union');
                return
            }
            const id = await conf.unionsRelationsRepo.createRequestUnionRelation(req.params.unionId, ChildType.user, user.id);
            res.status(200).send({id});
        } catch (e) {
            handleError(e, res);
        }
    }
}
