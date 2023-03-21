import CatPage, {getServerSideProps} from '@/pages/cats/[catId]/index';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import {testCat1} from '__tests__/data';
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '__tests__/utils';
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
    params: {catId: '1'},
    req: {},
    res: {}
}

const contextMissingParams = {
    req: {},
    res: {}
}

describe('Cat Page', () => {
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

        expect(response).toEqual({notFound: true})
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('should render without crashing', () => {
        render(<CatPage cat={testCat1}/>)

        const h1 = screen.getByRole('heading', {level: 1})

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('Your cat Smelly')
        const deleteLink = screen.getByRole('link', {name: 'Delete'})
        expect(deleteLink).toBeInTheDocument()
        const updateLink = screen.getByRole('link', {name: 'Update'})
        expect(updateLink).toBeInTheDocument()
    });

    it('should delete cat and navigate to cats page', () => {
        setUpFetchSuccessMock(testCat1);
        render(<CatPage cat={testCat1}/>)
        const deleteLink = screen.getByRole('link', {name: 'Delete'})
        expect(deleteLink).toBeInTheDocument()
        fireEvent.click(deleteLink);
        waitFor(() =>
            expect(mockRouter).toMatchObject({
                pathname: "/cats"
            })
        );
    });

    it('should stay on cat page when failed to delete', () => {
        mockRouter.push("/cats/1");
        setUpFetchErrorMock('Failed to delete cat');
        render(<CatPage cat={testCat1}/>)
        const deleteLink = screen.getByRole('link', {name: 'Delete'})
        expect(deleteLink).toBeInTheDocument()
        fireEvent.click(deleteLink);
        expect(mockRouter).toMatchObject({
            pathname: "/cats/1"
        })
    });

    it('should navigate to update cat page upon clicking', () => {
        render(<CatPage cat={testCat1}/>)
        const updateLink = screen.getByRole('link', {name: 'Update'})
        expect(updateLink).toBeInTheDocument()
        fireEvent.click(updateLink);
        waitFor(() =>
            expect(mockRouter).toMatchObject({
                pathname: "/cats/1/update"
            })
        );
    });
});
