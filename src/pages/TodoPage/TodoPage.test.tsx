import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {TodoPage} from './TodoPage';

describe('<TodoPage />', () => {
  test('it should mount', () => {
    render(<TodoPage />);
    
    const todoPage = screen.getByTestId('TodoPage');

    expect(todoPage).toBeInTheDocument();
  });
});