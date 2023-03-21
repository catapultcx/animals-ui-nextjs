import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import Filter from "@/components/Filter";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

describe('Filter', () => {
    it('should render without crashing', () => {

        render(<Filter/>)


        const inputText = screen.getByPlaceholderText('Enter text to filter cat by name or description');
        const btnFilter = screen.getByText('Filter');
        expect(inputText).toBeInTheDocument()
        expect(btnFilter).toBeInTheDocument()
    });

    it('should allow user to enter text to filter and submit', () => {

        render(<Filter/>)

        const inputText = screen.getByPlaceholderText('Enter text to filter cat by name or description');

        fireEvent.change(inputText, {target: {value: "cat"}})
        fireEvent.submit(screen.getByRole('form'));

        waitFor(() => {
            expect(mockRouter).toMatchObject({
                pathname: "/cats?filter=cat"
            })
        });
    });
});
