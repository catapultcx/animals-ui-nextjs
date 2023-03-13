export interface Cat {
  id: string;
  name: string;
  description: string;
  group: string;
}

export enum CRUDType {
  CREATE,
  UPDATE,
  DELETE,
}
