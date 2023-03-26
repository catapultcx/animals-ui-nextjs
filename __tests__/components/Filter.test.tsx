import "@testing-library/jest-dom"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {Filter} from "@/components/Filter"

let mockRouterPush = jest.fn(() => Promise.resolve())
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: mockRouterPush,
    }),
}))

describe("Filter", () => {
    test("renders form with input fields and submit button", () => {
        render(<Filter/>)

        expect(screen.getByLabelText("name")).toBeInTheDocument()
        expect(screen.getByLabelText("description")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Filter"})).toBeInTheDocument()
    })

    test("should submit form", async () => {
        render(<Filter/>)

        fireEvent.change(screen.getByLabelText("name"), {target: {value: "Whiskers"}})
        fireEvent.change(screen.getByLabelText("description"), {target: {value: "Cute cat"}})
        fireEvent.click(screen.getByRole("button", {name: "Filter"}))

        await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/cats?name=Whiskers&description=Cute+cat"))
    })

    test("should catch submit errors", async () => {
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {
        })
        mockRouterPush = jest.fn(() => Promise.reject("Router Error"))

        render(<Filter/>)

        fireEvent.submit(screen.getByRole("button", {name: "Filter"}))

        await waitFor(() => expect(mockConsoleError).toHaveBeenCalledWith("Router Error"))

        mockConsoleError.mockRestore()
    })
})
