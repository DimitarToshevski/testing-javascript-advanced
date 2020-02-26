import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders add product button', () => {
  const { getByText } = render(<App />);
  const button = getByText(/add product/i);
  expect(button).toBeInTheDocument();
});
