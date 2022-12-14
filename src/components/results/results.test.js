import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';

import Results from '.';

describe('Results Component', () => {
  it('Renders a results component and takes in props', () => {
    const payload = {
      headers: 'hello',
      data: 'hello-world',
      count: 100,
    }; 
    render(<Results data={payload} />);
    const results = screen.findByTestId('results-testId');

    expect((results)).toBeTruthy();
  })

  test('renders props as data', () => {
    let payload = {
      banana: "banana",
    }

    render(<Results payload={payload}/>);
    let pre = screen.getByTestId('results-testId');

    expect(pre).toHaveTextContent('banana');
  })
})