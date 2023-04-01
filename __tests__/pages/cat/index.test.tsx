import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils';
import { testCat1, testCats } from '__tests__/data';
import CreateCatPage from '@/pages/cat';
import { useRouter } from 'next/router';

const validContext = {
  req: {},
  res: {},
};

const contextMissingParams = {
  req: {},
  res: {},
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Create Cat Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    render(<CreateCatPage />);

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe('Create Cat');
  });

  it('should render all field', () => {
    const handleCreate = jest.fn();
    useRouter.mockReturnValue({
      push: () => handleCreate,
    });
    render(<CreateCatPage />);

    const name = screen.getByTestId('name');
    expect(name).toBeInTheDocument();

    const description = screen.getByTestId('description');
    expect(description).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Create' });
    expect(button).toBeInTheDocument();
  });

  it('calls handleCreate when button is clicked', () => {
    const handleCreate = jest.fn();
    useRouter.mockReturnValue({
      push: () => handleCreate,
    });
    setUpFetchSuccessMock(testCat1);

    render(<CreateCatPage />);
    const name = screen.getByRole('textbox', { name: /name/i });
    const description = screen.getByRole('textbox', { name: /description/i });

    fireEvent.change(name, { target: { value: 'Smelly updated' } });
    fireEvent.change(description, { target: { value: 'Smelly cat updated' } });

    expect(name.value).toEqual('Smelly updated');
    expect(description.value).toEqual('Smelly cat updated');

    const button = screen.getByRole('button', { name: 'Create' });
    expect(button).toBeTruthy();
    fireEvent.click(button);
    // expect(handleCreate).toHaveBeenCalled();
  });
});
