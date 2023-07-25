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
    <li>
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        onChange={handleUpdate}
      />
      <span>{todo.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
