import {setFetchUpMock} from "../../utils";
import {jest, expect} from "@jest/globals";
import postCatHandler from '@/pages/api/postCat'
import {NextApiRequest, NextApiResponse} from "next";

describe('pages/api/postCat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return value in success path', async () => {
    const resolvedValue = { name: 'Cat name', description: 'Cat description'}
    setFetchUpMock([{ ok: true, json: jest.fn(() => Promise.resolve(resolvedValue)) }])
    const spy = jest.fn().mockImplementation(() => ({ status: jest.fn(), json: jest.fn().mockImplementation((_) => Promise.resolve(resolvedValue)) }))
    await postCatHandler({ body: resolvedValue } as NextApiRequest, { status: spy } as any)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
