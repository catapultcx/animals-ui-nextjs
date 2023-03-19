import { testCat1 } from '../data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../utils'
import {RegisterCatService} from "@/services/api/register-cat-service";
import {Cat} from "@/domain/cat";

function getService () {
    return new RegisterCatService()
}

describe('Register Cat Service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    describe('register', () => {
        it('should register and return a cat', async () => {
            setUpFetchSuccessMock([testCat1])
            const  newCat: Cat = {
                id: '',
                name: 'Smelly',
                description: 'Smelly cat',
                group: 'Tabby'
            }
            const registered = await getService().register(newCat)

            expect(registered).toBeDefined()
            expect(registered?.id).toEqual('1')
            expect(registered?.name).toEqual('Smelly')
            expect(registered?.description).toEqual('Smelly cat')
            expect(registered?.group).toEqual('Tabby')

            expect(fetch).toHaveBeenCalledTimes(1)
        })

        it('should throw an error for failing to register', async () => {
            setUpFetchErrorMock('Error in registering new cat')

            const  newCat: Cat = {
                id: '',
                name: 'Smelly',
                description: 'Smelly cat',
                group: ''
            }

            await expect(getService().register(newCat))
                .rejects
                .toThrow('Error in registering new cat')

            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })
})
