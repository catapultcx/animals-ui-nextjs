import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '__tests__/utils';
import RegisterCatPage from "@/pages/cats/register";
import mockRouter from "next-router-mock";
import {testCat1} from "../../../data";

jest.mock("next/router", () => require("next-router-mock"));


describe('Register Cat Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render without crashing', () => {
    render(<RegisterCatPage/>)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Register New Cat')

    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()

    const  inputName = screen.getByLabelText('name');
    const  inputDesc = screen.getByLabelText('description');
    const  btnSubmit = screen.getByText('Submit');
    expect(inputName).toBeInTheDocument()
    expect(inputDesc).toBeInTheDocument()
    expect(btnSubmit).toBeInTheDocument()
  });

  it('should route to cats page after registering a cat', () => {
    setUpFetchSuccessMock(testCat1);
    render(<RegisterCatPage/>)

    const  inputName = screen.getByLabelText('name');
    const  inputDesc = screen.getByLabelText('description');
    const  btnSubmit = screen.getByText('Submit');

    fireEvent.change(inputName, { target: { value: "Smelly" } })
    fireEvent.change(inputDesc, { target: { value: "Smelly cat" } });
    fireEvent.click(btnSubmit);

    waitFor(() =>
        expect(mockRouter).toMatchObject({
          pathname: "/cats"
        })
    );
  });

  it('should stay on register cat page after failure in registering a cat', () => {
    mockRouter.push("/cats/register");
    setUpFetchErrorMock('Failed to register');
    render(<RegisterCatPage/>)

    const  inputName = screen.getByLabelText('name');
    const  inputDesc = screen.getByLabelText('description');
    const  btnSubmit = screen.getByText('Submit');

    fireEvent.change(inputName, { target: { value: "Smelly" } })
    fireEvent.change(inputDesc, { target: { value: "Smelly cat" } });
    fireEvent.click(btnSubmit);


    expect(mockRouter).toMatchObject({
      pathname: "/cats/register"
    });
  });

});
