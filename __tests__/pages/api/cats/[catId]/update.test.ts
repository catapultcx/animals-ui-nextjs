import { createMocks } from "node-mocks-http"
import { testCat1 } from "../../../../data"
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "../../../../utils"
import {waitFor} from "@testing-library/react"
import updateHandler from "@/pages/api/cats/[catId]/update"

describe("/api/cats/[catId]/update", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test("update cat and redirect", async () => {
        setUpFetchSuccessMock(testCat1)

        const { req, res } = createMocks({
            method: "POST",
            query: {
                catId: '1'
            },
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            }
        })

        await updateHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe("/cats/1")
        })
    })

    test("invalid cat id", async () => {
        setUpFetchErrorMock("Invalid cat id")

        const { req, res } = createMocks({
            method: 'POST',
            query: {
                catId: 1
            },
            body: {
                name: 'Smelly',
                description: 'Smelly cat'
            }
        })

        await updateHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(400)
            expect(res._getData()).toEqual(JSON.stringify({
                error: "catId must be a string"
            }))
        })
    })

    test("error update cat", async () => {
        setUpFetchErrorMock("Update error")

        const { req, res } = createMocks({
            method: 'POST',
            query: {
                catId: '1'
            }
        })

        await updateHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(500)
            expect(res._getData()).toEqual(JSON.stringify({
                error: "Failed to update cat 1 Error: Update error"
            }))
        })
    })
})
