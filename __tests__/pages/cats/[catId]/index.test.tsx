import CatPage, { getServerSideProps } from '@/pages/cats/[catId]/index'
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import { testCat1 } from '__tests__/data'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils'

import mockRouter from 'next-router-mock'

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
    jest.restoreAllMocks()
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
    render(<CatPage cat={testCat1} />)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Your cat Smelly')
  });

  it('should delete cat if delete button is clicked', async () => {
    mockRouter.push('/cats/1')

    setUpFetchSuccessMock([testCat1])

    render(<CatPage cat={testCat1}/>)

    const deleteButton = screen.getByRole('button', {name: 'Delete button'})

    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      });
    })
  })

  it('should navigate to edit cat page if edit button is clicked', async () => {
    mockRouter.push('/cats/1')

    setUpFetchSuccessMock([testCat1])

    render(<CatPage cat={testCat1}/>)

    const deleteButton = screen.getByRole('button', {name: 'Edit button'})

    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1/update'
      });
    })
  })

  it('should show error message if fetch error occurred when deleting cat', async () => {
    mockRouter.push('/cats/1')

    setUpFetchSuccessMock([testCat1])

    render(<CatPage cat={testCat1}/>)

    setUpFetchErrorMock('Database down')

    const deleteButton = screen.getByRole('button', {name: 'Delete button'})

    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument()
      expect(screen.getByText('Database down')).toBeInTheDocument()
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1'
      })
    })
  })

  it('should close error message when dismissed', async () => {
    mockRouter.push('/cats/1')

    setUpFetchSuccessMock([testCat1])

    render(<CatPage cat={testCat1}/>)

    setUpFetchErrorMock('Database down')

    const deleteButton = screen.getByRole('button', {name: 'Delete button'})

    fireEvent.click(deleteButton)

    await screen.findByRole('button', { name: 'Close alert' })

    fireEvent.click(screen.getByRole('button', { name: 'Close alert' }))

    await waitForElementToBeRemoved(screen.getByText('An error occurred'))
  })
})
