import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import mockAxios from '../__mocks__/axios';

afterEach(() => {
  mockAxios.reset();
});

describe('App Component', () => {
  test('renders learn react link', () => {

    render(<App />);

    

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

});
