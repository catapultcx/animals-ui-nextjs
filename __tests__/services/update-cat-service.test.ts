import { testCat1 } from '../data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../utils'
import {Cat} from "@/domain/cat";
import {UpdateCatService} from "@/services/api/update-cat-service";

function getService () {
    return new UpdateCatService()
}

describe('Update Cat Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    describe('update', () => {
        it('should update and return a cat', async () => {
            setUpFetchSuccessMock([testCat1])

            const updated = await getService().update(testCat1)

            expect(updated).toBeDefined()
            expect(updated?.id).toEqual('1')
            expect(updated?.name).toEqual('Smelly')
            expect(updated?.description).toEqual('Smelly cat')
            expect(updated?.group).toEqual('Tabby')

            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('should throw an error for failing to update', async () => {
            setUpFetchErrorMock('Error in updating cat')
            await expect(getService().update(testCat1))
                .rejects
                .toThrow('Error in updating cat')

            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })
})
