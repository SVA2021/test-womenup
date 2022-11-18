import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {TodoList} from './TodoList';

describe('<TodoList />', () => {
  const initialState = {
    data: [{id: 0, isChecked: false, text: 'add tasks in input area'}],
    counter: 0,
  }

  test('it should mount', () => {
    render(<TodoList count={initialState.counter} data={initialState.data} onClick={() => console.log('click')} />);
    
    const todoList = screen.getByTestId('TodoList');

    expect(todoList).toBeInTheDocument();
  });
});