import {DocumentSnapshot} from '@google-cloud/firestore/build/src';
import {Union} from '@webtree/unions-common/lib/model/union';
import {QuerySnapshot} from '@google-cloud/firestore';
import _ = require('lodash');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'webtree-unions',
});

export class UnionsService {
    public async put(userId: string, union: Union): Promise<Union> {
        const unionRef = db.collection('unions').doc(union.id!);
        let unionFromDb: DocumentSnapshot<Union> = await unionRef.get();

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

    public get(id: string): Promise<Union> {
        const unionPromise: Promise<DocumentSnapshot<Union>> = db
            .collection('unions')
            .doc(id)
            .get();
        return unionPromise.then(value => value.data()!);
    }

    public listUnionsByOwner(owner: string): Promise<Union[]> {
        console.log(owner)
        return db
            .collection('unions')
            .where('owner', '==', owner)
            .get()
            .then((snapshot: QuerySnapshot) => {
                console.log(snapshot)
                const unions: Union[] = [];
                snapshot.forEach(result => {
                    unions.push(result.data())
                });
                return unions;
            })
    }
}
