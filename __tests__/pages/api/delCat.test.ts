import {setFetchUpMock} from "../../utils";
import {jest, expect} from "@jest/globals";
import delCatHandler from '@/pages/api/delCat'
import {NextApiRequest} from "next";

describe('pages/api/delCat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return {} in success path', async () => {
    const resolvedValue = { }
    setFetchUpMock([{ ok: true, json: jest.fn(() => Promise.resolve(resolvedValue)) }])
    const spy = jest.fn().mockImplementation(() => ({ status: jest.fn(), end: jest.fn().mockImplementation((_) => {}) }))
    await delCatHandler({ body: { id: '123' }} as NextApiRequest, { status: spy } as any)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
