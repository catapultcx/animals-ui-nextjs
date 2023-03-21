import { CatsService } from "../../src/services/api/cats-service";
import { testCat1, testCats } from "../data";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "../utils";

// https://github.com/facebook/jest/issues/13834
// https://github.com/jsdom/jsdom/issues/1724
// https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752

function getService() {
  return new CatsService();
}

describe("Cats service for CRUD operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("get", () => {
    it("should return an cat for valid id", async () => {
      setUpFetchSuccessMock([testCat1]);

      const found = await getService().get({ id: testCat1.id });

      expect(found).toBeDefined();
      expect(found?.id).toEqual("1");
      expect(found?.name).toEqual("Smelly");
      expect(found?.description).toEqual("Smelly cat");
      expect(found?.group).toEqual("Tabby");

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error for invalid id", async () => {
      setUpFetchErrorMock("Not found");

      await expect(getService().get({ id: "NaN" })).rejects.toThrow(
        "Not found"
      );

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("all", () => {
    it("should return all cats", async () => {
      setUpFetchSuccessMock([testCats]);

      const results = await getService().all();

      expect(results).toBeDefined();
      expect(results?.length).toEqual(2);
      expect(results[0].id).toEqual("1");
      expect(results[0].name).toEqual("Smelly");
      expect(results[0].description).toEqual("Smelly cat");
      expect(results[0].group).toEqual("Tabby");

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error for invalid id", async () => {
      setUpFetchErrorMock("Not found");

      await expect(getService().all()).rejects.toThrow("Not found");

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("remove the cat if it exists", () => {
    it("should remove the choosen cat and reload remaining ones", async () => {
      setUpFetchSuccessMock([testCats]);
      const resultsAfterDelete = await getService().remove({ id: "2" });
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("create or register a new cat", () => {
    it("should create a cat by the given parameters", async () => {
      setUpFetchSuccessMock([testCat1]);
      const freshCat: Cat = {
        name: "Another crazy cat",
        description: "This one is really crazy",
      };
      const addedCat = await getService().register(freshCat);

      expect(addedCat).toBeDefined();
      expect(addedCat?.id).toEqual("1");
      expect(addedCat?.name).toEqual("Another crazy cat");
      expect(addedCat?.description).toEqual("This one is really crazy");
      expect(addedCat?.group).toEqual("Tabby");

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it(" should fail registeration ", async () => {
      setUpFetchErrorMock("Error in creating or registering a call");
      const freshCat: Cat = {
        id: "",
        name: "Another crazy cat",
        description: "This will fail",
        group: "",
      };

      await expect(getService().register(freshCat)).rejects.toThrow(
        "Error in creating or registering a call"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("Modify an existing cat", () => {
    it("Cat should be updated", async () => {
      setUpFetchSuccessMock([testCat1]);

      const modified = await getService().update(testCat1);

      expect(modified).toBeDefined();
      expect(modified?.id).toEqual("1");
      expect(modified?.name).toEqual("Smelly");
      expect(modified?.description).toEqual("Smelly cat");
      expect(modified?.group).toEqual("Tabby");

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error for failing to update", async () => {
      setUpFetchErrorMock("Error whilst updating");
      await expect(getService().update(testCat1)).rejects.toThrow(
        "Error whilst updating"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("filter cat name or description", () => {
    it("should ", async () => {
      setUpFetchSuccessMock([testCats]);

      const results = await getService().filter("Smelly");

      expect(results).toBeDefined();
      expect(results?.length).toEqual(2);
      expect(results[0].id).toEqual("1");
      expect(results[0].name).toEqual("Smelly");
      expect(results[0].description).toEqual("Smelly cat");
      expect(results[0].group).toEqual("Tabby");

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw an error on filter", async () => {
      setUpFetchErrorMock("Not found");

      await expect(getService().filter("Garfield")).rejects.toThrow(
        "Not found"
      );

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
