import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilterComponent from '@/components/cat/FilterComponent'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '../../utils'
import { accountError1, testCat1, testCats } from '../../data'

jest.mock('next/router', () => require('next-router-mock'))

describe('FilterComponent', () => {

  it('should render without crashing', () => {
    render(<FilterComponent onFilter={ jest.fn() }/>)

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'query' })).toBeInTheDocument()
  })

  it('should filter', async () => {
    setUpFetchSuccessMock([ testCats ])

    render(<FilterComponent onFilter={ jest.fn() }/>)

    const input = screen.getByRole('textbox', { name: 'query' })
    fireEvent.change(input, { target: { value: 'cat' } })

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/filter?query=cat'), expect.any(Object))
  })

  it('should throw an error if fetch error', async () => {
    setUpFetchErrorMock(accountError1.statusText)

    render(<FilterComponent onFilter={ jest.fn() }/>)

    const input = screen.getByRole('textbox', { name: 'query' })
    fireEvent.change(input, { target: { value: 'cat' } })

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/cats/filter?query=cat'), expect.any(Object))
  })

})
