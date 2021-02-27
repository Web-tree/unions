export class Union {
  id?: string;
  displayName?: string;
  creator?: string;
  owner?: string;
  parent?: Union;
  children?: Union[] = [];
  tags?: string[] = [];

}
