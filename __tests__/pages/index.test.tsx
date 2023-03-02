import HomePage from '@/pages/index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('Home Page', () => {
  it('should render without crashing', () => {
    render(<HomePage />)

    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toBe('Welcome, register your animals')
  });
});
