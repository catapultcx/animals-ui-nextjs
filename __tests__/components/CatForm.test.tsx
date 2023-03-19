import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import CatForm from '@/components/CatForm';
import {testCat1} from "../data";
import {Cat} from "@/domain/cat";

describe('CatForm', () => {
    it('should render without crashing', () => {
        render(<CatForm cat={testCat1}/>)

        expect(screen.getByText('Name:')).toBeInTheDocument()
        expect(screen.getByText('Description:')).toBeInTheDocument()

        const  inputName = screen.getByLabelText('name');
        const  inputDesc = screen.getByLabelText('description');
        const  btnSubmit = screen.getByText('Submit');
        expect(inputName).toBeInTheDocument()
        expect(inputDesc).toBeInTheDocument()
        expect(btnSubmit).toBeInTheDocument()
    });

    const newCat:Cat = {id : '1', name : '', description : '', group : 'Tabby'};
    it('should allow user to enter input and submit', () => {

        const onSubmit = jest.fn();

        render(<CatForm cat={newCat} onSubmit={onSubmit}/>)

        const  inputName = screen.getByLabelText('name');
        const  inputDesc = screen.getByLabelText('description');
        const  btnSubmit = screen.getByText('Submit');

        fireEvent.change(inputName, { target: { value: "Smelly" } })
        fireEvent.change(inputDesc, { target: { value: "Smelly cat" } });
        fireEvent.click(btnSubmit);
        expect(onSubmit).toBeCalledWith(testCat1);
    });
});
