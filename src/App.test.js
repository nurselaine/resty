import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import mockAxios from '../__mocks__/axios';
import { rest } from 'msw';

afterEach(() => {
  mockAxios.reset();
});

describe('App Component', () => {
  test('renders learn react link', () => {

    render(<App />);

    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('calls the handleApi function', () => {
    let handleApiCall = jest.fn();
    render(<Form handleApiCall={handleApiCall}/>);

    expect(handleApiCall).toHaveBeenCalled();
  });

  test('Can get data from API', () => {
    
  })

});
