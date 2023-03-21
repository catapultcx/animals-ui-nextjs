import { CatsService } from '@/services/api/cats-service'
import { testCat1, testCat1_without_id, testCats } from '../data'
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
      setUpFetchSuccessMock([ testCat1 ])

      const found = await getService().get({ id: testCat1.id })

      expect(found).toBeDefined()
      expect(found?.id).toEqual('1')
      expect(found?.name).toEqual('Smelly')
      expect(found?.description).toEqual('Smelly cat')
      expect(found?.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/' + testCat1.id), expect.any(Object))
    })

    it('should throw an error for invalid id', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().get({ id: 'NaN' }))
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/' + 'NaN'), expect.any(Object))
    })
  })

  describe('all', () => {
    it('should return all cats', async () => {
      setUpFetchSuccessMock([ testCats ])

      const results = await getService().all()

      expect(results).toBeDefined()
      expect(results?.length).toEqual(2)
      expect(results[0].id).toEqual('1')
      expect(results[0].name).toEqual('Smelly')
      expect(results[0].description).toEqual('Smelly cat')
      expect(results[0].group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats'), expect.any(Object))
    })

    it('should throw an error if fetch error', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().all())
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('update', () => {
    it('should update existing cat', async () => {
      setUpFetchSuccessMock(testCat1)

      const updated = await getService().update({ cat: testCat1 })

      expect(updated).toBeDefined()
      expect(updated.id).toEqual('1')
      expect(updated.name).toEqual('Smelly')
      expect(updated.description).toEqual('Smelly cat')
      expect(updated.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/' + testCat1.id), expect.any(Object))
    })

    it('should throw an error if fetch error', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().update({ cat: testCat1 }))
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/' + testCat1.id), expect.any(Object))
    })
  })

  describe('create', () => {
    it('should register a new cat', async () => {
      setUpFetchSuccessMock(testCat1)

      const created = await getService().create({ cat: testCat1_without_id })

      expect(created).toBeDefined()
      expect(created?.id).toEqual('1')
      expect(created?.name).toEqual('Smelly')
      expect(created?.description).toEqual('Smelly cat')
      expect(created?.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats'), expect.any(Object))
    })

    it('should throw an error if fetch error', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().create({ cat: testCat1_without_id }))
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats'), expect.any(Object))
    })
  })

  describe('delete', () => {
    it('should delete a new cat', async () => {
      setUpFetchSuccessMock(testCat1)

      const deleted = await getService().delete({ cat: testCat1.id })

      expect(deleted).toBeDefined()
      expect(deleted?.id).toEqual('1')
      expect(deleted?.name).toEqual('Smelly')
      expect(deleted?.description).toEqual('Smelly cat')
      expect(deleted?.group).toEqual('Tabby')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats'), expect.any(Object))
    })

    it('should throw an error if fetch error', async () => {
      setUpFetchErrorMock('Not found')

      await expect(getService().delete({ cat: testCat1.id }))
        .rejects
        .toThrow('Not found')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats'), expect.any(Object))
    })
  })
})
