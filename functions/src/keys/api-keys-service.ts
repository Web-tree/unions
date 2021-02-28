import * as _ from "lodash";
import {QuerySnapshot} from "@google-cloud/firestore";
import {ApiKeysPair} from "@webtree/unions-common/lib/api-keys-pair";

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'webtree-unions',
});

const collectionPath = 'api-keys';

export class ApiKeysService {
    public async newKeysForUnion(unionId: string): Promise<ApiKeysPair> {
        const keysPair = ApiKeysService.generateKeysPair(unionId);
        await db.collection(collectionPath)
            .doc(keysPair.appId)
            .set(_.toPlainObject(keysPair))
        return keysPair
    }

    public getUnionsKeys(unionId: string): Promise<ApiKeysPair> {
        return db.collection(collectionPath)
            .where('unionId', '==', unionId)
            .get()
            .then((snapshot: QuerySnapshot) => {
                const keys: ApiKeysPair[] = [];
                snapshot.forEach(value => {
                    const documentData = value.data();
                    const keyPair: ApiKeysPair = {
                        appId: documentData.appId,
                    }
                    keys.push(keyPair);
                });
                return keys;
            })
    }

    private static generateKeysPair(unionId: string): ApiKeysPair {
        return new ApiKeysPair(
            ApiKeysService.generateRandomString(40),
            ApiKeysService.generateRandomString(100),
            unionId
        )
    }

    private static generateRandomString(length: number): string {
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            console.log(Math.floor(Math.random() * length))
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
