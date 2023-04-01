import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCat1 } from '__tests__/data';
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils';
import EditCat, { getServerSideProps } from '@/pages/cats/[catId]/edit';
import { useRouter } from 'next/router';

const validContext = {
  params: { catId: '1' },
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

describe('Cat Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('getServerSideProps should return account property for valid context', async () => {
    setUpFetchSuccessMock([testCat1]);

    const response = await getServerSideProps(validContext as any);

    expect(response).toEqual({
      props: {
        cat: testCat1,
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('getServerSideProps should return not found for invalid id', async () => {
    setUpFetchErrorMock('Not found');

    const response = await getServerSideProps(contextMissingParams as any);

    expect(response).toEqual({ notFound: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should render without crashing', () => {
    const handleOnEdit = jest.fn();
    useRouter.mockReturnValue({
      push: () => handleOnEdit,
    });

    render(<EditCat cat={testCat1} />);

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe('Edit Cat');
  });
});
