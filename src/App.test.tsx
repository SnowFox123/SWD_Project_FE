import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



//npm i react-toastify
//npm i axios
//npm install jwt-decode
//npm install react-redux
//npm install @reduxjs/toolkit
//npm i redux-persist