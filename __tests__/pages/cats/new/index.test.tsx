import NewCatPage from '@/pages/cats/new';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { setFetchUpMock } from '__tests__/utils';
import Router from 'next/router'
jest.mock('next/router', ()=> ({push: jest.fn()}));

describe('New Cat Page', () => {
 beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
 });
  it('should render without crashing',  () => {
    render(<NewCatPage />)

    const h1 = screen.getByRole('heading', { level: 1 });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe('Add a new cat');
  });

  it('should add a new cat and redirects to cats page', async()=>{
    setFetchUpMock([{
        json: async () => await Promise.resolve(),
        ok: true
      }]);
    render(<NewCatPage />);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value:'my cat'}});
    fireEvent.change(screen.getByLabelText('Description'), {target: {value:'my desc'}});

    await act(()=> fireEvent.click(screen.getByRole('button')));
    expect(Router.push).toHaveBeenCalledWith('/cats')
  });
});
