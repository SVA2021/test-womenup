import React from 'react';
import {TodoPage} from './pages/TodoPage';

export const App = () => {
  return (
    <div className="container" data-testid="App">
      <TodoPage />
    </div>
  );
}