export interface Cat {
  id: string;
  name: string;
  description: string;
  group: Group;
}

export enum Group {
  AMPHIBIAN,
  BIRD,
  FISH,
  INVERTEBRATE,
  MAMMALS,
  REPTILES
}
