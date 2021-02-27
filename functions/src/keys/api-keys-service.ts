import {ApiKeysPair} from './api-keys-pair';
import * as _ from "lodash";

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'webtree-unions',
});

export class ApiKeysService {
    public async newKeysForUnion(unionId: string): Promise<ApiKeysPair> {
        const keysPair = this.generateKeysPair(unionId);
        await db.collection('api-keys')
            .doc(keysPair.appId)
            .set(_.toPlainObject(keysPair))
        return keysPair
    }

    private generateKeysPair(unionId: string): ApiKeysPair {
        return new ApiKeysPair(
            this.generateRandomString(50),
            this.generateRandomString(100),
            unionId
        )
    }

    private generateRandomString(length: number): string {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            console.log(Math.floor(Math.random() * length))
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
