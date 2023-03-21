import {createMocks} from 'node-mocks-http';
import {setUpFetchErrorMock, setUpFetchSuccessMock} from "../../../../utils";
import {testCat1} from "../../../../data";
import {waitFor} from "@testing-library/react";
import deleteHandler from "@/pages/api/cats/[catId]/delete";

describe('/api/cats/[catId]/delete', () => {
    test('delete a cat and redirects to cats page', async () => {
        setUpFetchSuccessMock(testCat1);
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                catId : 1
            }
        });

        await deleteHandler(req, res)
        waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe('/cats')
        });
    });

    test('fails to delete cat', async () => {
        setUpFetchErrorMock('Failed to delete')
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                catId : 1
            }
        });

        await deleteHandler(req, res);

        waitFor(() => {

            expect(res._getStatusCode()).toBe(500)
            expect(JSON.parse(res._getData())).toEqual(
                expect.objectContaining({
                    message: 'Failed to delete'
                }))

        });

    });
});