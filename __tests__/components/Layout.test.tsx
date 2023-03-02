import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Layout from '@/components/Layout';

describe('Layout', () => {
  it('should render without crashing', () => {
    render(<Layout />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Manage cats')).toBeInTheDocument()
    expect(screen.getByText('Animals')).toBeInTheDocument()
  });
});
