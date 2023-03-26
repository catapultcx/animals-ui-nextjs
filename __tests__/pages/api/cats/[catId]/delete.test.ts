import { createMocks } from "node-mocks-http"
import deleteHandler from "@/pages/api/cats/[catId]/delete"
import { testCat1 } from "../../../../data"
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "../../../../utils"
import { waitFor } from "@testing-library/react"

describe("/api/cats/[catId]/delete", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test("delete cat and redirect", async () => {
        setUpFetchSuccessMock(testCat1)

        const { req, res } = createMocks({
            method: "POST",
            query: {
                catId: '1'
            }
        })

        await deleteHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(307)
            expect(res._getRedirectUrl()).toBe("/cats")
        })
    })

    test("invalid cat id", async () => {
        setUpFetchErrorMock("Invalid cat id")

        const { req, res } = createMocks({
            method: 'POST',
            query: {
                catId: 1
            }
        })

        await deleteHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(400)
            expect(res._getData()).toEqual(JSON.stringify({
                error: "catId must be a string"
            }))
        })
    })

    test("error deleting cat", async () => {
        setUpFetchErrorMock("Delete error")

        const { req, res } = createMocks({
            method: 'POST',
            query: {
                catId: '1'
            }
        })

        await deleteHandler(req, res)

        await waitFor(() => {
            expect(res._getStatusCode()).toBe(500)
            expect(res._getData()).toEqual(JSON.stringify({
                error: "Failed to delete cat 1 Error: Delete error"
            }))
        })
    })
})
