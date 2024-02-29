import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    setTodos([...todos, { task, isCompleted: false, isEditing: false }]);
    setTask('');
  };

  const toggleCompletion = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTask = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTask = (index, newTask) => {
    const newTodos = [...todos];
    newTodos[index].task = newTask;
    setTodos(newTodos);
  };

  const startEditing = index => {
    const newTodos = [...todos];
    newTodos[index].isEditing = true;
    setTodos(newTodos);
  };

  const stopEditing = index => {
    const newTodos = [...todos];
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>My tasks</h1>
      <div className="input">
        <input value={task} onChange={e => setTask(e.target.value)} />
        <button onClick={addTask}>Add task</button>
      </div>
      {todos.map((todo, index) => (
        <div key={index} className='list' style={{ backgroundColor: todo.isCompleted ? 'rgb(240, 240, 224)' : '' }}>
          <div className="list-name">
            <div className="check-name">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleCompletion(index)}
          />
          {todo.isEditing ? (
            <input
              value={todo.task}
              onChange={e => editTask(index, e.target.value)}
              onBlur={() => stopEditing(index)}
            />
          ) : (
            <span>{todo.task}</span>
          )}
          </div>
          <div className="btns">
            <button onClick={() => removeTask(index)}>Remove</button>
            {todo.isEditing ? (
              <button onClick={() => stopEditing(index)}>Save</button>
            ) : (
              <button onClick={() => startEditing(index)}>Edit</button>
            )}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;