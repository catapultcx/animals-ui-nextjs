import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import CatForm, {SaveMode} from '@/components/CatForm'

import mockRouter from 'next-router-mock'
import {setUpFetchErrorMock, setUpFetchSuccessMock} from '../utils'
import {testCat1} from '../data'

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

  it('should render in update mode without crashing', () => {
    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

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

  it('should have populated name and description fields in update mode', () => {
    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    expect(nameInput).toHaveValue(testCat1.name)
    expect(descriptionInput).toHaveValue(testCat1.description)
  })

  it('should update name field value when field changed in create mode', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const input = screen.getByRole('textbox', {name: 'Name input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should update description field value when field changed in create mode', () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const input = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should update name field value when field changed in update mode', () => {
    render(<CatForm mode={SaveMode.UPDATE}/>)

    const input = screen.getByRole('textbox', {name: 'Name input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should update description field value when field changed in update mode', () => {
    render(<CatForm mode={SaveMode.UPDATE}/>)

    const input = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(input, {target: {value: 'foo'}})

    expect(input).toHaveValue('foo')
  })

  it('should display error message for blank name and description fields when submitted in create mode', async () => {
    render(<CatForm mode={SaveMode.CREATE}/>)

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    const nameErrorText = screen.getByText('Please provide a name.')
    const descriptionErrorText = screen.getByText('Please provide a description.')

    await waitFor(() => {
      expect(nameErrorText).toBeInTheDocument()
      expect(descriptionErrorText).toBeInTheDocument()
    })
  })

  it('should display error message for blank name and description fields when submitted in update mode', async () => {
    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    const nameErrorText = screen.getByText('Please provide a name.')
    const descriptionErrorText = screen.getByText('Please provide a description.')

    await waitFor(() => {
      expect(nameErrorText).toBeInTheDocument()
      expect(descriptionErrorText).toBeInTheDocument()
    })
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

  it('should update cat when name and description specified and form submitted', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

    setUpFetchSuccessMock(testCat1)

    const submitButton = screen.getByRole('button', { name: 'Submit'})

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    })
  })

  it('should show error message if fetch error occurred when submitting in create mode', async () => {
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

  it('should show error message if fetch error occurred when submitting in update mode', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

    setUpFetchErrorMock('Database down')

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

  it('should close error message if dismissed', async () => {
    mockRouter.push('/cats/1')

    render(<CatForm cat={testCat1} mode={SaveMode.UPDATE}/>)

    setUpFetchErrorMock('Database down')

    const submitButton = screen.getByRole('button', {name: 'Submit'})

    fireEvent.click(submitButton)

    await screen.findByRole('button', {name: 'Close alert'})

    fireEvent.click(screen.getByRole('button', {name: 'Close alert'}))

    await waitForElementToBeRemoved(screen.getByText('An error occurred'))
  })
})