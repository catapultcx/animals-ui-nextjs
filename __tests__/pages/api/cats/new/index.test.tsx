import { createMocks } from "node-mocks-http"
import createHandler from "src/pages/api/cats/create"
import { testCat1 } from "../../../../data"
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "../../../../utils"
import { waitFor } from "@testing-library/react";

describe("/api/cats/new", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test("creates cat and redirect", async () => {
        setUpFetchSuccessMock(testCat1)

        const { req, res } = createMocks({
            method: "GET",
        })

        await createHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe("/cats")
        })
    })

    test("error creating cat", async () => {
        setUpFetchErrorMock("Create error")

        const { req, res } = createMocks({
            method: 'POST',
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            }
        })

        await createHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(500)
            expect(res._getData()).toEqual(JSON.stringify({
                error: "Failed to create cat Error: Create error",
            }))
        })
    })
})
