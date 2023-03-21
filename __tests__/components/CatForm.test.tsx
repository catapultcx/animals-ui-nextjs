import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import CatForm, {SaveMode} from '@/components/CatForm'

import mockRouter from 'next-router-mock'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '../utils'

jest.mock('next/router', () => require('next-router-mock'))

describe('Cat Form', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render in create mode without crashing', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })

  it('should have blank name and description fields in create mode', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    expect(nameInput).not.toHaveValue()
    expect(descriptionInput).not.toHaveValue()
  })

  it('should update name field value when field changed', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const input = screen.getByRole('textbox', {name: 'Name input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should update description field value when field changed', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const input = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should display error message for blank name and description fields when submitted in CREATE mode', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    const nameErrorText = screen.getByText('Please provide a name.')
    const descriptionErrorText = screen.getByText('Please provide a description.')

    expect(nameErrorText).toBeInTheDocument()
    expect(descriptionErrorText).toBeInTheDocument()
  })

  it('should create cat when name and description specified and form submitted', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm mode={SaveMode.CREATE}/>)

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(nameInput, {target: {value: 'foo'}})
    fireEvent.change(descriptionInput, {target: {value: 'bar'}})

    setUpFetchSuccessMock({ id: '', name: 'foo', description: 'bar', group: 'MAMMALS' })

    const submitButton = screen.getByRole('button', { name: 'Submit'})

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    })
  })

  it('should show error message if fetch error occurred when submitting', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm mode={SaveMode.CREATE}/>)

    setUpFetchErrorMock('Database down')

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(nameInput, {target: {value: 'foo'}})
    fireEvent.change(descriptionInput, {target: {value: 'bar'}})

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument()
      expect(screen.getByText('Database down')).toBeInTheDocument()
      expect(mockRouter).toMatchObject({
        pathname: '/cats/1'
      })
    })
  })

  it('should close alert message if dismissed', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm mode={SaveMode.CREATE}/>)

    setUpFetchErrorMock('Database down')

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(nameInput, {target: {value: 'foo'}})
    fireEvent.change(descriptionInput, {target: {value: 'bar'}})

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    await screen.findByRole('button', {name: 'Close alert'})

    fireEvent.click(screen.getByRole('button', {name: 'Close alert'}))

    await waitForElementToBeRemoved(screen.getByText('An error occurred'))
  })
})