import CatsPage, { getServerSideProps } from '@/pages/cats/index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils';
import { testCats } from '__tests__/data';
import {setFetchUpMock} from "../../utils"
import userEvent from '@testing-library/user-event'
import {expect, jest} from '@jest/globals'

const validContext = {
  req: {},
  res: {}
}

const contextMissingParams = {
  req: {},
  res: {}
}

describe('Cats Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('getServerSideProps should return account property for valid context', async () => {
    setUpFetchSuccessMock([testCats])

    const response = await getServerSideProps(validContext as any)

    expect(response).toEqual({
      props: {
        cats: testCats
      }
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('getServerSideProps should return not found for any fetch error', async () => {
    setUpFetchErrorMock('Not found')

    const response = await getServerSideProps(contextMissingParams as any)

    expect(response).toEqual({ notFound: true })
    expect(fetch).toHaveBeenCalledTimes(1)
  })


  it('should render without crashing', () => {
    render(<CatsPage cats={testCats}/>)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('View your cats')
    expect(screen.getByText('Add a cat')).toBeInTheDocument()
  });

  it('should render cat adding row correctly', () => {
    const cats = [{ name: ''}, ...testCats]
    render(<CatsPage cats={cats}/>)
    expect(screen.getByText('Add')).toBeInTheDocument()
  })

  it('should render successfully added cat in the list', async () => {
    const cats = [{ name: ''}, ...testCats]
    const user = userEvent.setup()
    render(<CatsPage cats={cats}/>)
    const resolvedValue = { name: 'Cat name', id: 'Cat id', description: 'Cat description'}
    screen.getByTestId('name').innerText = resolvedValue.name
    screen.getByTestId('desc').innerText = resolvedValue.description
    setFetchUpMock([{ ok: true, json: jest.fn(() => Promise.resolve(resolvedValue)) }])
    user.click(screen.getByText('Add'))
    await new Promise((r) => setTimeout(r, 100))
    expect(screen.queryByTestId('Add-button')).toBeNull()
  })
});
