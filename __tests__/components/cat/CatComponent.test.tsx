import CatComponent from '@/components/cat/CatComponent'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('next/router', () => require('next-router-mock'))

describe('Cat component', () => {

  it('should render without crashing', () => {
    render(<CatComponent/>)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

})
