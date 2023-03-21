import {setFetchUpMock} from "../../utils";
import {jest, expect} from "@jest/globals";
import updateCatHandler from '@/pages/api/updateCat'
import {NextApiRequest} from "next";

describe('pages/api/updateCat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return value in success path', async () => {
    const resolvedValue = { id: 'abc', name: 'Cat name', description: 'Cat description'}
    setFetchUpMock([{ ok: true, json: jest.fn(() => Promise.resolve(resolvedValue)) }])
    const spy = jest.fn().mockImplementation(() => ({ status: jest.fn(), json: jest.fn().mockImplementation((_) => Promise.resolve(resolvedValue)) }))
    const updateValue = {...resolvedValue, name: 'New name', description: 'New description'}
    await updateCatHandler({ body: updateValue } as NextApiRequest, { status: spy } as any)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
