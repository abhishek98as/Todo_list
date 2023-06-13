import { render, screen } from '@testing-library/react';
import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';


test('renders learn react link', () => {
  render(<todo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
