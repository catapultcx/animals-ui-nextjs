import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import NewCatPage from "@/pages/cats/new"

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe("New Cat Page", () => {
    it("should render without crashing", () => {
        render(<NewCatPage />)

        const h1 = screen.getByRole("heading", { level: 1 })

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe("Register Cat")

        expect(screen.getByLabelText("name")).toBeInTheDocument()
        expect(screen.getByLabelText("description")).toBeInTheDocument()

        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /cancel/i })).toBeInTheDocument()
    })
})
