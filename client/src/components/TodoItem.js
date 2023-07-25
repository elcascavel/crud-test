const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const handleUpdate = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    onUpdateTodo(updatedTodo);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.todo_id);
  };

  return (
    <li className="App-listItem">
      <div>
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          onChange={handleUpdate}
        />
        <span>{todo.title}</span>
      </div>
      <button onClick={handleDelete}>X</button>
    </li>
  );
};

export default TodoItem;
