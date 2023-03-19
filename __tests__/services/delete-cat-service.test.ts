import { testCat1 } from '../data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../utils'
import {RegisterCatService} from "@/services/api/register-cat-service";
import {Cat} from "@/domain/cat";
import {DeleteCatService} from "@/services/api/delete-cat-service";

function getService () {
    return new DeleteCatService()
}

describe('Delete Cat Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    describe('delete', () => {
        it('should delete and return a cat', async () => {
            setUpFetchSuccessMock([testCat1])

            const deleted = await getService().delete('1')

            expect(deleted).toBeDefined()
            expect(deleted?.id).toEqual('1')
            expect(deleted?.name).toEqual('Smelly')
            expect(deleted?.description).toEqual('Smelly cat')
            expect(deleted?.group).toEqual('Tabby')

            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('should throw an error for failing to delete', async () => {
            setUpFetchErrorMock('Error in deleting cat')

            await expect(getService().delete('-100'))
                .rejects
                .toThrow('Error in deleting cat')

            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })
})
