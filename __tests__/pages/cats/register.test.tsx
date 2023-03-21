import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import Register from "@/pages/cats/register";
import { act } from "react-dom/test-utils";
import { setUpFetchSuccessMock } from "../../utils";
import { testCat1 } from "../../data";

describe('Register Page', () => {

    const router = { push: jest.fn() }

    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue(router)
    })

    it('should render without crashing', () => {
        render(<Register />)

        const h1 = screen.getByRole('heading', { level: 1});

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe("Register new cat")
    });

    it('should validate the form', async () => {
        render(<Register />);

        const button = screen.getByText("Save")
        const form = await screen.findByRole("form");

        await act(() => {
            button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        });

        expect(form).toHaveClass("was-validated");
    });

    it('should submit the form', async () => {

        setUpFetchSuccessMock(testCat1);

        render(<Register />);

        const button = screen.getByText("Save");

        const inputName = await screen.findByPlaceholderText("Enter your cat name");
        const inputDescription = await screen.findByPlaceholderText("Enter you cat description");

        await act(() => {
            fireEvent.change(inputName, { target: { value: "New Cat Name" } });
            fireEvent.change(inputDescription, { target: { value: "New Cat Description" } });
            button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        })

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith("/cats");

    });

});
