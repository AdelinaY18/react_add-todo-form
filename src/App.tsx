import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserEmpty = userId === '';

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    const user = usersFromServer.find(
      currentUser => currentUser.id === Number(userId),
    );

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            data-cy="titleInput"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
