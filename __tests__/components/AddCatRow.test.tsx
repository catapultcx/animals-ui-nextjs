import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import{ AddCatRow } from '@/components/AddCatRow'
import {setFetchUpMock} from "../utils"
import userEvent from '@testing-library/user-event'
import {expect, jest} from '@jest/globals'

describe('AddCatRow', () => {
  const successHandlerSpy = jest.fn()
  const Element = <table><tbody><AddCatRow successHandler={successHandlerSpy}/></tbody></table>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', () => {
    render(Element)
    expect(screen.getByText('Add')).toBeInTheDocument()
  });
  it('should not add a cat if name/description are not provided', async () => {
    const user = userEvent.setup()
    render(Element)
    setFetchUpMock([{ ok: true }])
    const addButton = screen.getByText('Add')
    await user.click(addButton)
    expect(successHandlerSpy).toHaveBeenCalledTimes(0)
  })
  it('should handle adding a cat in success path', async () => {
    const user = userEvent.setup()
    render(Element)
    const resolvedValue = { name: 'Cat name', id: 'Cat id', description: 'Cat description'}
    setFetchUpMock([{ ok: true, json: jest.fn(() => Promise.resolve(resolvedValue)) }])
    screen.getByTestId('name').innerText = resolvedValue.name
    screen.getByTestId('desc').innerText = resolvedValue.description
    const addButton = screen.getByText('Add')
    await user.click(addButton)
    expect(successHandlerSpy).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Added')).toBeInTheDocument()
  })
  it('should handle adding a cat in failure path', async () => {
    const user = userEvent.setup()
    render(Element)
    setFetchUpMock([{ ok: false }])
    screen.getByTestId('name').innerText = 'Cat name'
    screen.getByTestId('desc').innerText = 'Cat description'
    const addButton = screen.getByText('Add')
    await user.click(addButton)
    expect(successHandlerSpy).toHaveBeenCalledTimes(0)
    expect(screen.getByText('Add')).toBeInTheDocument()
  })
});
