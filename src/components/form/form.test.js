import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import mockAxios from '__mocks__/axios';
import { rest } from { msw };
import Form from './index';

afterEach(() => {
  mockAxios.reset();
});

describe('Form Component', () => {
  it('Can render a form', () => {
    render(<Form />);

    const form = screen.getByTestId('form');

    expect(form).toBeTruthy();
  });

  it('Can update form data', () => {
    
    
    render(<Form handleApiCall={handleApiCall} />);

    const form = screen.getByTestId('form');
    expect(form).toHaveTextContent('URL: GO!GETPOSTPUTDELETE');
  });

  it('Can call ')
})