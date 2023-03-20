import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '__tests__/utils';
import mockRouter from "next-router-mock";
import {testCat1, testCat1Updated} from "../../../data";
import UpdateCatPage from "@/pages/cats/[catId]/update";
import {getServerSideProps} from "@/pages/cats/[catId]/update";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
    params: { catId: '1' },
    req: {},
    res: {}
}

const contextMissingParams = {
    req: {},
    res: {}
}
describe('Update Cat Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
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
        setUpFetchErrorMock('Not found')

        const response = await getServerSideProps(contextMissingParams as any)

        expect(response).toEqual({ notFound: true })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should render without crashing', () => {
        render(<UpdateCatPage cat={testCat1}/>)

        const h1 = screen.getByRole('heading', { level: 1 })

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Update Cat 1')

        expect(screen.getByText('Name:')).toBeInTheDocument()
        expect(screen.getByText('Description:')).toBeInTheDocument()

        const  inputName = screen.getByLabelText('name');
        const  inputDesc = screen.getByLabelText('description');
        const  btnSubmit = screen.getByText('Submit');
        expect(inputName).toBeInTheDocument()
        expect(inputName).toHaveValue('Smelly')
        expect(inputDesc).toBeInTheDocument()
        expect(inputDesc).toHaveValue('Smelly cat')
        expect(btnSubmit).toBeInTheDocument()
    });

    it('should route to cats page after updating a cat', () => {
        setUpFetchSuccessMock(testCat1Updated);
        render(<UpdateCatPage cat={testCat1}/>)

        const  inputName = screen.getByLabelText('name');
        const  inputDesc = screen.getByLabelText('description');
        const  btnSubmit = screen.getByText('Submit');

        fireEvent.change(inputName, { target: { value: "Smelly1" } })
        fireEvent.change(inputDesc, { target: { value: "Smelly cat1" } });
        fireEvent.click(btnSubmit);

        waitFor(() =>
            expect(mockRouter).toMatchObject({
                pathname: "/cats"
            })
        );
    });

    it('should stay on update cat page after failure in updating a cat', () => {
        mockRouter.push("/cats/1/update");
        setUpFetchErrorMock('Failed to update');
        render(<UpdateCatPage cat={testCat1}/>)

        const  inputName = screen.getByLabelText('name');
        const  inputDesc = screen.getByLabelText('description');
        const  btnSubmit = screen.getByText('Submit');

        fireEvent.change(inputName, { target: { value: "Smelly1" } })
        fireEvent.change(inputDesc, { target: { value: "Smelly cat1" } });
        fireEvent.click(btnSubmit);


        expect(mockRouter).toMatchObject({
            pathname: "/cats/1/update"
        });
    });

});
