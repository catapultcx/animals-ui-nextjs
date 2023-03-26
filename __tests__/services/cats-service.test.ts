import { CatsService } from '@/services/api/cats-service'
import { testCat1, testCats } from '../data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../utils'

// https://github.com/facebook/jest/issues/13834
// https://github.com/jsdom/jsdom/issues/1724
// https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752

function getService () {
  return new CatsService()
}

describe('Cats service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  describe('get', () => {
    it('should return an cat for valid id', async () => {
      setUpFetchSuccessMock([testCat1])

      const found = await getService().get({ id:  testCat1.id })

      expect(found).toBeDefined()
      expect(found?.id).toEqual('1')
      expect(found?.name).toEqual('Smelly')
      expect(found?.description).toEqual('Smelly cat')
      expect(found?.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error for invalid id', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().get({ id: 'NaN' }))
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('all', () => {
    it('should return all cats', async () => {
      setUpFetchSuccessMock([testCats])

      const results = await getService().all()

      expect(results).toBeDefined()
      expect(results?.length).toEqual(2)
      expect(results[0].id).toEqual('1')
      expect(results[0].name).toEqual('Smelly')
      expect(results[0].description).toEqual('Smelly cat')
      expect(results[0].group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error for invalid id', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().all())
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe("create", () => {
    it("should create and return a cat", async () => {
      setUpFetchSuccessMock([testCat1])

      const result = await getService().create({ cat: testCat1 })

      expect(result).toBeDefined()
      expect(result.id).toEqual("1")
      expect(result.name).toEqual("Smelly")
      expect(result.description).toEqual("Smelly cat")
      expect(result.group).toEqual("Tabby")

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("should throw an error when create fails", async () => {
      setUpFetchErrorMock("Create error")

      await expect(
          getService().create({
            cat: testCat1,
          })
      ).rejects.toThrow("Create error")

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('delete', () => {
    it('should delete and return cat', async () => {
      setUpFetchSuccessMock([testCat1])

      const deleted = await getService().delete({id: '1'})

      expect(deleted).toBeDefined()
      expect(deleted?.id).toEqual('1')
      expect(deleted?.name).toEqual('Smelly')
      expect(deleted?.description).toEqual('Smelly cat')
      expect(deleted?.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error when delete fails', async () => {
      setUpFetchErrorMock('Delete error')

      await expect(getService().delete({id: '1'}))
          .rejects
          .toThrow('Delete error')

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe("update", () => {
    it("should update and return a cat", async () => {
      setUpFetchSuccessMock([testCat1])

      const result = await getService().update({ cat: testCat1 })

      expect(result).toBeDefined()
      expect(result.id).toEqual("1")
      expect(result.name).toEqual("Smelly")
      expect(result.description).toEqual("Smelly cat")
      expect(result.group).toEqual("Tabby")

      expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("should throw an error when create fails", async () => {
      setUpFetchErrorMock("Update error")

      await expect(
          getService().create({
            cat: testCat1,
          })
      ).rejects.toThrow("Update error")

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })


})
