import { rest } from 'msw';

export const handler = [

  rest.get('/', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.setItem('is-authenticated');
    
  })
]