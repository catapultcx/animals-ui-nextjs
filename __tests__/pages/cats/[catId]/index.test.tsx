import CatPage, { getServerSideProps } from '@/pages/cats/[catId]/index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { testCat1 } from '__tests__/data';
import {setFetchUpMock, setUpFetchErrorMock, setUpFetchSuccessMock} from '__tests__/utils';
import {expect, jest} from '@jest/globals'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import userEvent from '@testing-library/user-event'

const validContext = {
  params: { catId: '1' },
  req: {},
  res: {}
}

const contextMissingParams = {
  req: {},
  res: {}
}


jest.mock('next/router', () => require('next-router-mock'))

describe('Cat Page', () => {

  beforeEach(() => {
    jest.clearAllMocks()
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

    expect(response).toEqual({ notFound: true })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should render without crashing', () => {
    render(<MemoryRouterProvider><CatPage cat={testCat1} /></MemoryRouterProvider>)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Your cat Smelly')
  });
  it('should render Delete button', () => {
    render(<MemoryRouterProvider><CatPage cat={testCat1} /></MemoryRouterProvider>)
    expect(screen.getByTestId('Delete-button')).toBeInTheDocument()
  });
  it('should handle deletion and route to /cats', async () => {
    const user = userEvent.setup()
    render(<MemoryRouterProvider><CatPage cat={testCat1} /></MemoryRouterProvider>)
    setFetchUpMock([{ ok: true }])
    const deleteButton = screen.getByTestId('Delete-button')
    await user.click(deleteButton)
    expect(mockRouter.pathname).toBe('/cats')
  })

  it('should handle update and route to /cats', async () => {
    const user = userEvent.setup()
    render(<MemoryRouterProvider><CatPage cat={testCat1} /></MemoryRouterProvider>)
    setFetchUpMock([{ ok: true }])
    const updateButton = screen.getByTestId('Update-button')
    await user.click(updateButton)
    expect(mockRouter.pathname).toBe('/cats')
  })
});
