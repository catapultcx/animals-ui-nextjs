import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import RegisterCatPage from '@/pages/cats/register'

jest.mock('next/router', () => require('next-router-mock'))

describe('Register Cat Page', () => {
  it('should render without crashing', () => {
    render(<RegisterCatPage />)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Register cat')
  })
})