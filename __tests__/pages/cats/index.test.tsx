import CatsPage, { getServerSideProps } from '@/pages/cats/index';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils';
import { testCat1, testCats } from '__tests__/data';
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

describe('Cats Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('getServerSideProps should return account property for valid context', async () => {
    setUpFetchSuccessMock([testCats]);

    const response = await getServerSideProps(validContext as any);

    expect(response).toEqual({
      props: {
        cats: testCats,
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getServerSideProps should return not found for any fetch error', async () => {
    setUpFetchErrorMock('Not found');

    const response = await getServerSideProps(contextMissingParams as any);

    expect(response).toEqual({ notFound: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should render without crashing', () => {
    const handleDelete = jest.fn();
    useRouter.mockReturnValue({
      push: () => handleDelete,
    });
    render(<CatsPage cats={testCats} />);

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe('View your cats');
  });

  it('should render Delete button', async () => {
    setUpFetchSuccessMock([testCats]);
    const handleDelete = jest.fn();
    useRouter.mockReturnValue({
      push: () => handleDelete,
    });

    render(<CatsPage cats={testCats} />);

    const deleteButton = screen.getAllByText('Delete')[0];
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.textContent).toBe('Delete');
    fireEvent.click(deleteButton);
    // expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('should be able to serach cats', () => {
    setUpFetchSuccessMock(testCat1);
    render(<CatsPage cats={testCats} />);

    const name = screen.getByTestId('name');
    const description = screen.getByTestId('description');

    fireEvent.change(name, { target: { value: 'Smelly' } });
    fireEvent.change(description, { target: { value: 'cat' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    console.log(searchButton);

    fireEvent.click(searchButton);
  });
});
