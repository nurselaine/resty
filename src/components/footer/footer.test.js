import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Footer from './index';

describe('Footer Component', () => {
  it('Renders out a footer component with text', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');

    expect(footer).toHaveTextContent('© 2018');
    expect(footer).toBeTruthy();
  })
})