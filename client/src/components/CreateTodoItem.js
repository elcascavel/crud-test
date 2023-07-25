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
    <div>
      <form className="create">
        <div>
          <input
            type="text"
            name="todo"
            id="todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Create a new todo..."
          />
        </div>
        <button onClick={handleCreateTodo} type="submit">
          +
        </button>
      </form>
    </div>
  );
};

export default CreateTodoItem;
