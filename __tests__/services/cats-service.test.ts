import { CatsService } from '@/services/api/cats-service'
import { testCat1, testCats } from '../data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../utils'
import {expect, jest} from '@jest/globals'

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
})

describe('post', () => {
  it('should return a cat when a valid post command is provided', async () => {
    setUpFetchSuccessMock(testCat1)

    const cat = await getService().post({ name: 'Smelly', description: 'Smelly cat' })

    expect(cat).toBeDefined()
    expect(cat?.id).toEqual('1')
    expect(cat?.name).toEqual('Smelly')
    expect(cat?.description).toEqual('Smelly cat')
    expect(cat?.group).toEqual('Tabby')

    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should throw an error when an invalid post command is provided', async () => {
    setUpFetchErrorMock('Bad request')

    await expect(getService().post({ name: '', description: '' }))
      .rejects
      .toThrow('Bad request')

    expect(fetch).toHaveBeenCalledTimes(1)
  })
})

describe('delete', () => {
  it('should delete a cat for valid id', async () => {
    const deleteId = '1'

    setUpFetchSuccessMock({})

    const result = await getService().delete({ id: deleteId })

    expect(result).toEqual({})
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(`${getService().baseUrl}/cats/${deleteId}`, {
      method: 'DELETE'
    })
  })

  it('should return null for invalid id', async () => {
    const deleteId = 'NaN'

    setUpFetchErrorMock('Not found')

    const result = await getService().delete({ id: deleteId })

    expect(result).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(`${getService().baseUrl}/cats/${deleteId}`, {
      method: 'DELETE'
    })
  })
})
