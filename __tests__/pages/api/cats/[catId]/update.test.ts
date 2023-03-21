import {createMocks} from 'node-mocks-http';
import {setUpFetchErrorMock, setUpFetchSuccessMock} from "../../../../utils";
import {testCat1} from "../../../../data";
import {waitFor} from "@testing-library/react";
import updateHandler from "@/pages/api/cats/[catId]/update";

describe('/api/cats/[catId]/update', () => {
    test('updates a cat and redirects to cats page', async () => {
        setUpFetchSuccessMock(testCat1);
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            },
            query: {
                catId : 1
            }
        });

        await updateHandler(req, res)
        waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe('/cats')
        });
    });

    test('fails to update cat', async () => {
        setUpFetchErrorMock('Failed to update')
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            },
            query: {
                catId : 1
            }
        });

        await updateHandler(req, res);

        waitFor(() => {

            expect(res._getStatusCode()).toBe(500)
            expect(JSON.parse(res._getData())).toEqual(
                expect.objectContaining({
                    message: 'Failed to update'
                }))

        });

    });
});