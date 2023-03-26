import "@testing-library/jest-dom"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {CatForm} from "@/components/CatForm"

const mockRouterPush = jest.fn()
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}))

const cat = {
    id: "1",
    name: "Whiskers",
    description: "A cute cat",
    group: "MAMMALS"
}

describe("CatForm", () => {
    test("should render without crashing", () => {
        render(<CatForm cat={cat} action="/cats"/>)

        expect(screen.getByLabelText("name")).toHaveValue(cat.name)
        expect(screen.getByLabelText("description")).toHaveValue(cat.description)
        expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument()
    })

    test("should submit form", () => {
        const mockFetch = jest.fn(() => Promise.resolve())
        // @ts-ignore
        global.fetch = mockFetch

        render(<CatForm cat={cat} action="/submit"/>)

        fireEvent.change(screen.getByLabelText("name"), {target: {value: "Whiskers"}})
        fireEvent.change(screen.getByLabelText("description"), {target: {value: "Cute cat"}})
        fireEvent.submit(screen.getByRole("button", {name: "Submit"}))

        expect(mockFetch).toHaveBeenCalledWith("/submit", {
            method: "POST",
            body: JSON.stringify({name: "Whiskers", description: "Cute cat"}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
    })

    test("should catch submit errors", async () => {
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {
        })
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.reject("Fetch Error"))

        render(<CatForm cat={cat} action="/submit"/>)

        fireEvent.submit(screen.getByRole("button", {name: "Submit"}))

        await waitFor(() => expect(mockConsoleError).toHaveBeenCalledWith("Fetch Error"))

        mockConsoleError.mockRestore()
    })
})