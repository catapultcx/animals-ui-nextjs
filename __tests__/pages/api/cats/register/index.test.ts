import {createMocks} from 'node-mocks-http';
import {setUpFetchErrorMock, setUpFetchSuccessMock} from "../../../../utils";
import {testCat1} from "../../../../data";
import registerHandler from "@/pages/api/cats/register";
import {waitFor} from "@testing-library/react";

describe('/api/cats/register', () => {
    test('registers a cat and redirects to cats page', async () => {
        setUpFetchSuccessMock(testCat1);
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            },
        });

        await registerHandler(req, res)
        waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe('/cats')
        });
    });

    test('fails to register cat', async () => {
        setUpFetchErrorMock('Failed to register')
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            },
        });

        await registerHandler(req, res);

        waitFor(() => {

            expect(res._getStatusCode()).toBe(500)
            expect(JSON.parse(res._getData())).toEqual(
                expect.objectContaining({
                    message: 'Failed to register'
                }))

        });

    });
});