import { useState } from "react";

const CreateTodoItem = ({ createTodo }) => {
  const [title, setTitle] = useState("");

  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodo({
      title: title,
    });
    setTitle("");
  };

  return (
    <div className="create">
      <h2>Create Todo Item</h2>
      <form>
        <label htmlFor="todo">Todo</label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreateTodo} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTodoItem;
