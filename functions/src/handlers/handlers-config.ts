import NodeCache from 'node-cache';
import {AuthService} from '../auth/auth.service';
import {UnionsRepo} from '../unions/unions.repo';
import {RequestService} from '../request/request.service';
import {ApiKeysService} from '../keys/api-keys-service';
import {UnionRelationsRepo} from '../unions/union-relations.repo';

export class HandlersConfig {
    public userCache: NodeCache;
    public authService: AuthService;
    public unionsRepo: UnionsRepo;
    public unionsRelationsRepo: UnionRelationsRepo;
    public requestService: RequestService;
    public apiKeyService: ApiKeysService;

    constructor() {
        this.userCache = new NodeCache();
        this.authService = new AuthService(this.userCache);
        this.unionsRepo = new UnionsRepo();
        this.unionsRelationsRepo = new UnionRelationsRepo();
        this.requestService = new RequestService();
        this.apiKeyService = new ApiKeysService()
    }
}
