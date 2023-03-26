import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { testCat1 } from "__tests__/data"
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "__tests__/utils"
import EditCatPage, { getServerSideProps } from "@/pages/cats/[catId]/edit"

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))

const validContext = {
    params: { catId: "1" },
    req: {},
    res: {}
}

const contextMissingParams = {
    req: {},
    res: {}
}

describe("Edit Cat Page", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it("getServerSideProps should return cat property for valid context", async () => {
        setUpFetchSuccessMock([testCat1])

        const response = await getServerSideProps(validContext as any)

        expect(response).toEqual({
            props: {
                cat: testCat1
            }
        })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("getServerSideProps should return not found for invalid id", async () => {
        setUpFetchErrorMock("Not found")

        const response = await getServerSideProps(contextMissingParams as any)

        expect(response).toEqual({ notFound: true })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("should render without crashing", () => {
        render(<EditCatPage cat={testCat1} />)

        const h1 = screen.getByRole("heading", { level: 1 })

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe("Edit cat Smelly")

        const  name = screen.getByLabelText("name")
        const  description = screen.getByLabelText("description")

        expect(name).toBeInTheDocument()
        expect(name).toHaveValue("Smelly")
        expect(description).toBeInTheDocument()
        expect(description).toHaveValue("Smelly cat")

        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /cancel/i })).toBeInTheDocument()
    })
})
