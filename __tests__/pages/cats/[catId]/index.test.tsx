import CatPage, { getServerSideProps } from '@/pages/cats/[catId]/index'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    setUpFetchSuccessMock([ testCat1 ])

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
    setUpFetchSuccessMock(testCat1)

    render(<CatPage cat={ testCat1 }/>)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Your cat Smelly')
  })

  it('should have navigation buttons', () => {
    setUpFetchSuccessMock(testCat1)

    render(<CatPage cat={ testCat1 }/>)

    expect(screen.getByText('Back to Manage Cats')).toBeInTheDocument()
    expect(screen.getByText('Edit Cat details')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete Cat' })).toBeInTheDocument()
  })

  it('should confirm delete cat action', async () => {
    mockRouter.push('/cats/1')
    setUpFetchSuccessMock(testCat1)

    window.confirm = () => true

    render(<CatPage cat={ testCat1 }/>)

    fireEvent.click(screen.getByRole('button', { name: 'Delete Cat' }))

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    )
  })

  it('should not confirm delete cat action', async () => {
    mockRouter.push('/cats/1')
    setUpFetchSuccessMock(testCat1)

    window.confirm = () => false

    render(<CatPage cat={ testCat1 }/>)

    fireEvent.click(screen.getByRole('button', { name: 'Delete Cat' }))

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1'
      })
    )
  })

  it('should fail on confirm delete cat action', async () => {
    mockRouter.push('/cats/1')
    setUpFetchErrorMock(testCat1)

    window.confirm = () => true

    render(<CatPage cat={ testCat1 }/>)

    fireEvent.click(screen.getByRole('button', { name: 'Delete Cat' }))

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1'
      })
    )
  })

})
