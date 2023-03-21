import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import CatForm from '@/components/CatForm';
import {testCat1} from "../data";
import {Cat} from "@/domain/cat";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
describe('CatForm', () => {
    it('should render without crashing', () => {
        render(<CatForm cat={testCat1} formAction='/api/cats/register'/>)

        expect(screen.getByText('Name:')).toBeInTheDocument()
        expect(screen.getByText('Description:')).toBeInTheDocument()

        const inputName = screen.getByLabelText('name');
        const inputDesc = screen.getByLabelText('description');
        const btnSubmit = screen.getByText('Submit');
        expect(inputName).toBeInTheDocument()
        expect(inputDesc).toBeInTheDocument()
        expect(btnSubmit).toBeInTheDocument()
    });

    const newCat: Cat = {id: '1', name: '', description: '', group: 'Tabby'};
    it('should allow user to enter input to register cat and submit', () => {

        render(<CatForm cat={newCat} formAction='/api/cats/register'/>)

        const inputName = screen.getByLabelText('name');
        const inputDesc = screen.getByLabelText('description');

        fireEvent.change(inputName, {target: {value: "Smelly"}})
        fireEvent.change(inputDesc, {target: {value: "Smelly cat"}});
        fireEvent.submit(screen.getByRole('form'));

        waitFor(() => {
            expect(mockRouter).toMatchObject({
                pathname: "/api/cats/register"
            })
        });
    });

    it('should allow user to change input to update cat and submit', () => {

        render(<CatForm cat={testCat1} formAction='/api/cats/1/update'/>)

        const inputName = screen.getByLabelText('name');
        const inputDesc = screen.getByLabelText('description');

        fireEvent.change(inputName, {target: {value: "Smelly1"}})
        fireEvent.change(inputDesc, {target: {value: "Smelly cat1"}});
        fireEvent.submit(screen.getByRole('form'));

        waitFor(() => {
            expect(mockRouter).toMatchObject({
                pathname: "/api/cats/1/update"
            })
        });
    });
});