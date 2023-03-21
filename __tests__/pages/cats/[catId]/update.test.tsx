import UpdateCatPage, {getServerSideProps} from '@/pages/cats/[catId]/update'
import {
  render,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import {testCat1} from '__tests__/data'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '../../../utils'

jest.mock('next/router', () => require('next-router-mock'))

const validContext = {
  params: {catId: '1'},
  req: {},
  res: {}
}

const contextMissingParams = {
  req: {},
  res: {}
}

jest.mock('next/router', () => require('next-router-mock'))

describe('Update Cat Page', () => {
  it('should render without crashing', () => {
    render(<UpdateCatPage cat={testCat1}/>)

    const h1 = screen.getByRole('heading', {level: 1})

    expect(h1).toBeInTheDocument()
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

    expect(response).toEqual({notFound: true})
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
