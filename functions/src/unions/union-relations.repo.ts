import {ChildType, UnionRelationRecord} from '@webtree/unions-common/lib/unions/union-relation-record';
import {DocumentReference} from '@google-cloud/firestore';

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
    projectId: 'webtree-unions',
});

const collectionPath = 'unions-relations';

export class UnionRelationsRepo {
    public async createRequestUnionRelation(unionParentId: string, childType: ChildType, childId: string): Promise<string> {
        const unionRelationRecord = await this.getUnionRelation(unionParentId, childType, childId);
        if (unionRelationRecord) {
            return Promise.reject('Relation already exists');
        }
        const data = {unionParentId, childType, childId};
        return db.collection(collectionPath)
            .add(data)
            .then(({id}: DocumentReference) => id);
    }

    public async getUnionRelation(unionParentId: string, childType: ChildType, childId: string): Promise<UnionRelationRecord | undefined> {
        const promise = db.collection(collectionPath)
            .where('unionParentId', '==', unionParentId)
            .where('childType', '==', childType)
            .where('childId', '==', childId)
            .get();
        return promise.then((snapshot: any) => snapshot.docs.length > 0 ? snapshot.docs[0].data() : undefined);
    }
}
