export class UnionRelationRecord {
  public approved = false;
  public additionalParams = new Map<string, any>();

  constructor(public unionParentId: string, public childType: ChildType, public childId: string) {}
}
export enum ChildType {
  union,
  user,
}
