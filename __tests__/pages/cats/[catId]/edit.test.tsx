import '@testing-library/jest-dom'
import { fireEvent, render, screen } from "@testing-library/react";
import Edit from "@/pages/cats/[catId]/edit";
import { testCat1 } from "__tests__/data";
import { setUpFetchErrorMock, setUpFetchSuccessMock } from "../../../utils";
import { act } from "react-dom/test-utils";
import { getServerSideProps } from "@/pages/cats/[catId]/edit";

const validContext = {
    params: { catId: '1' },
    req: {},
    res: {}
}

const contextMissingParams = {
    req: {},
    res: {}
}

describe('Register Page', () => {

    const router = { push: jest.fn() }

    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
        const useRouter = jest.spyOn(require("next/router"), "useRouter")
        useRouter.mockReturnValue(router)
    })

    it('getServerSideProps should return account property for valid context', async () => {
        setUpFetchSuccessMock([testCat1])

        const response = await getServerSideProps(validContext as any)

        expect(response).toEqual({
            props: {
                cat: testCat1
            }
        })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('getServerSideProps should return not found for invalid id', async () => {
        setUpFetchErrorMock("Not found")

        const response = await getServerSideProps(contextMissingParams as any)

        expect(response).toEqual({ notFound: true })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should render without crashing', () => {
        render(<Edit cat={testCat1} />)

        const h1 = screen.getByRole("heading", { level: 1});

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe("Edit cat Smelly")
    });

    it('should submit the form', async () => {

        setUpFetchSuccessMock(testCat1);

        render(<Edit cat={testCat1} />);

        const button = screen.getByText("Save");

        const inputName = await screen.findByPlaceholderText("Enter your cat name");
        const inputDescription = await screen.findByPlaceholderText("Enter you cat description");

        await act(() => {
            fireEvent.change(inputName, { target: { value: "New Cat Name" } });
            fireEvent.change(inputDescription, { target: { value: "New Cat Description" } });
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        })

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(router.push).toHaveBeenCalledWith("/cats/1");

    });

});
