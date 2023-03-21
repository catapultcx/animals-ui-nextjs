import CreateCatPage from '@/pages/cats/create'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { setUpFetchErrorMock, setUpFetchSuccessMock } from '__tests__/utils'
import { accountError1, testCat1 } from '__tests__/data'
import '@testing-library/jest-dom'

jest.mock('next/router', () => require('next-router-mock'))

describe('Create Cat Page', () => {

  it('should render without crashing', () => {
    render(<CreateCatPage/>)

    const header = screen.getByRole('heading', { level: 1 })

    expect(header.textContent).toBe('Register a new Cat')
  })

  it('should show error messages', () => {
    render(<CreateCatPage/>)

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(screen.getByText('Cat name is required')).toBeInTheDocument()
    expect(screen.getByText('Cat description is required')).toBeInTheDocument()
  })

  it('should save Cat and redirect to manage cats', async () => {
    mockRouter.push('/cats/create')
    setUpFetchSuccessMock(testCat1)

    render(<CreateCatPage/>)

    const inputName = screen.getByLabelText('Cat name')
    fireEvent.change(inputName, { target: { value: testCat1.name } })

    const inputDescription = screen.getByLabelText('Cat description')
    fireEvent.change(inputDescription, { target: { value: testCat1.description } })

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    )
  })

  it('should not save Cat and stay on same create page', async () => {
    mockRouter.push('/cats/create')
    setUpFetchErrorMock(accountError1.statusText)

    render(<CreateCatPage/>)

    const inputName = screen.getByLabelText('Cat name')
    fireEvent.change(inputName, { target: { value: testCat1.name } })

    const inputDescription = screen.getByLabelText('Cat description')
    fireEvent.change(inputDescription, { target: { value: testCat1.description } })

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(mockRouter).toMatchObject({
      pathname: '/cats/create'
    })
  })

  it('should cancel Cat form and return to manage cats', async () => {
    mockRouter.push('/cats/create')

    render(<CreateCatPage/>)

    const inputName = screen.getByLabelText('Cat name')
    fireEvent.change(inputName, { target: { value: testCat1.name } })

    const inputDescription = screen.getByLabelText('Cat description')
    fireEvent.change(inputDescription, { target: { value: testCat1.description } })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: '/cats'
      })
    )
  })

})
