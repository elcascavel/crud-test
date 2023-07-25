import TodoItem from "./TodoItem";

const TodoList = ({ todoItems, onUpdateTodo, onDeleteTodo }) => {
  return (
    <ul>
      {todoItems.map((todo) => (
        <TodoItem
          key={todo.todo_id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
