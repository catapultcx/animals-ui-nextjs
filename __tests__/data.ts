import { Cat } from "../src/domain/cat";

export const testCat1: Cat = {
  id: "1",
  name: "Smelly",
  description: "Smelly cat",
  group: "Tabby",
};

export const testCat2: Cat = {
  id: "2",
  name: "Garfield",
  description: "Lazy cat",
  group: "Tabby",
};

export const testCats = [testCat1, testCat2];

export const accountError1 = {
  statusText: "Not found",
};

export const response1 = {
  body: undefined, // new PassThrough(),
  headers: new Headers(),
  status: 200,
  statusText: "OK",
  ok: true,
  url: undefined, // resource as string,
  arrayBuffer: () => new ArrayBuffer(0),
  blob: () => new Blob(),
  clone: jest.fn(),
  error: jest.fn(),
  formData: () => new FormData(),
  json: () => ({}),
  redirect: jest.fn(),
  text: () => "dummy text",
};

export const session = {
  user: {},
};
