export interface Cat {
  id: string
  name: string
  description: string
  group: string
}

export const DefaultCat: Cat = {
  id: "",
  name: "",
  description: "",
  group: "MAMMALS",
}
