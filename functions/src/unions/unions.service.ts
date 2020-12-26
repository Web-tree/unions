import * as functions from 'firebase-functions';
import {Union} from './union';
import _ = require('lodash');
import {DocumentSnapshot} from '@google-cloud/firestore/build/src';


const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'webtree-unions',
});

export class UnionsService {
    public async put(userId: string, union: Union): Promise<Union> {

        const unionRef = db.collection('unions').doc(union.id!);
        let unionFromDb: DocumentSnapshot<Union> = await unionRef.get();

        functions.logger.debug(unionFromDb)
        if (unionFromDb.exists && unionFromDb.data()?.owner !== userId) {
            return Promise.reject("You don't have permissions to update this union.");
        }
        union.owner = userId;
        union.creator = userId;
        await unionRef.set(_.toPlainObject(union));

        unionFromDb = await unionRef.get();

        if ((unionFromDb.data()?.owner !== userId)) {
            return Promise.reject("You don't have permissions to update this union.");
        }
        return Promise.resolve(unionFromDb.data()!);
    }

    // public get(id: string) {
    //     return db.collection('unions').doc(id);
    // }
}
