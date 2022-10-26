import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Form from './index';


describe('Form Component', () => {
  it('Can render a form', () => {
    render(<Form />);

    const form = screen.getByTestId('form');

    expect(form).toBeTruthy();
  });

  it('Can update form data', () => {
    render(<Form />);

    const form = screen.getByTestId('form');
    expect(form).toHaveTextContent('URL: GO!GETPOSTPUTDELETE');
  });
})