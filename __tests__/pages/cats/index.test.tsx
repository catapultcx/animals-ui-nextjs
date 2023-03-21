import CatsPage, {getServerSideProps} from '@/pages/cats/index';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '__tests__/utils';
import {testCat1, testCats} from '__tests__/data';
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const validContext = {
    req: {},
    res: {}
}

const validFilterContext = {
    req: {},
    query: { filter : 'Smelly'},
    res: {}
}

const contextMissingParams = {
    req: {},
    res: {}
}

describe('Cats Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    it('getServerSideProps should return account property for valid context', async () => {
        setUpFetchSuccessMock([testCats])

        const response = await getServerSideProps(validContext as any)

        expect(response).toEqual({
            props: {
                cats: testCats
            }
        })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('getServerSideProps should return filtered cats for valid filter context', async () => {
        setUpFetchSuccessMock([testCat1])

        const response = await getServerSideProps(validFilterContext as any)

        expect(response).toEqual({
            props: {
                cats: testCat1
            }
        })
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it('getServerSideProps should return not found for any fetch error', async () => {
        setUpFetchErrorMock('Not found')

        const response = await getServerSideProps(contextMissingParams as any)

        expect(response).toEqual({notFound: true})
        expect(fetch).toHaveBeenCalledTimes(1)
    })


    it('should render without crashing', () => {
        render(<CatsPage cats={testCats}/>)

        const h1 = screen.getByRole('heading', {level: 1})

        expect(h1).toBeInTheDocument()
        expect(h1.textContent).toBe('View your cats')
        expect(screen.getByText('Register New Cat')).toBeInTheDocument()
        const inputText = screen.getByPlaceholderText('Enter text to filter cat by name or description')
        const btnFilter = screen.getByText('Filter')
        expect(inputText).toBeInTheDocument()
        expect(btnFilter).toBeInTheDocument()
    });

    it('should filter cats', () => {

        setUpFetchSuccessMock([testCat1])
        render(<CatsPage cats={testCats}/>)
        const inputText = screen.getByPlaceholderText('Enter text to filter cat by name or description');

        fireEvent.change(inputText, {target: {value: "Smelly"}})
        fireEvent.submit(screen.getByRole('form'));

        waitFor(() => {
            expect(mockRouter).toMatchObject({
                pathname: "/cats?filter=Smelly"
            })

        });

    });

});
