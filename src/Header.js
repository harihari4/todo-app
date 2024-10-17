import React, { useState } from 'react';
import './App.css';

function Header() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // Add new task
  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask('');
    }
  };

  // Delete a task
  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  // Toggle completion of task
  const toggleComplete = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Start editing a task
  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setTask(todo.task);
  };

  // Update a task
  const updateTodo = () => {
    const updatedTodos = todos.map(todo =>
      todo.id === currentTodo.id ? { ...todo, task } : todo
    );
    setTodos(updatedTodos);
    setTask('');
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <div className="App">
      <h1>Todo List (CRUD)</h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add or edit a task"
        />
        <button onClick={isEditing ? updateTodo : addTodo}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.task}</span>
            <div className="buttons">
              <button onClick={() => editTodo(todo)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;

