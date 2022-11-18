import React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from './App';

test('renders learn react link', () => {
  render(<App />);
  const AppElement = screen.getByTestId('App');
  expect(AppElement).toBeInTheDocument();
});