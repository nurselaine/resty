import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header Component', () => {
  it('Renders an h1 tag', () => {
    render(<Header />);

    const h1 = screen.getByTestId('header');
    expect(h1).not.toBeFalsy();
  })
})