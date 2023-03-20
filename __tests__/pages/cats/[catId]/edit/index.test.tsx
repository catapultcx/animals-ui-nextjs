import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils'
import { accountError1, testCat1 } from '../../../../data'
import EditCatPage, { getServerSideProps } from '@/pages/cats/[catId]/edit'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock';

const validContext = {
  req: {},
  res: {},
  params: { catId: testCat1.id }
}

const contextMissingParams = {
  req: {},
  res: {},
  params: { catId: testCat1.id }
}

jest.mock('next/router', () => require('next-router-mock'));

describe('Edit Cat Page', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render EditCatPage', () => {
    render(<EditCatPage cat={ testCat1 }/>)

    expect(screen.getByRole('heading').textContent).toEqual('Edit Cat details')
  })

  it('should return testCat1', async () => {
    setUpFetchSuccessMock(testCat1)

    const response = await getServerSideProps(validContext as any)

    expect(response.props.cat).toEqual(testCat1)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/1'), {})
  })

  it('should navigate back to manage cats', async () => {
    mockRouter.push('/cats/1/update');

    setUpFetchSuccessMock(testCat1)

    render(<EditCatPage cat={ testCat1 }/>)

    const button = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(button)

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    );
  })

  it('should return not found', async () => {
    setUpFetchErrorMock(accountError1.statusText)

    const response = await getServerSideProps(contextMissingParams as any)

    expect(response).toEqual({ notFound: true })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/1'), {})
  })

  it('should not navigate back to manage cats as save error', async () => {
    mockRouter.push('/cats/1/edit')

    setUpFetchErrorMock(accountError1.statusText)

    render(<EditCatPage cat={ testCat1 }/>)

    const button = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(button)

    expect(mockRouter).toMatchObject({
      pathname: '/cats/1/edit'
    })
  })

  it('should cancel editing and navigate back view mode', async () => {
    mockRouter.push('/cats/1/update');

    setUpFetchSuccessMock(testCat1)

    render(<EditCatPage cat={ testCat1 }/>)

    const button = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(button)

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1'
      })
    );
  })


})
