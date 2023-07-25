import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";

import { useState, useEffect } from "react";
import CreateTodoItem from "./components/CreateTodoItem";

async function getTodos() {
  const response = await fetch("http://localhost:5000/api");
  const data = await response.json();

  return data;
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }, []);

  const createTodo = async (todo) => {
    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      todo.todo_id = data.todo_id;

      setTodos((prevTodos) => [...prevTodos, { ...todo }]);
    } catch (err) {
      console.log("Error creating task: ", err);
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/update/${updatedTodo.todo_id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTodo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong with updating!");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
        )
      );
    } catch (err) {
      console.log("Error updating task: ", err);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/delete/${todoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong with deletion!");
      }

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.todo_id !== todoId)
      );
    } catch (err) {
      console.log("Error deleting task: ", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateTodoItem createTodo={createTodo} />
        <TodoList
          todoItems={todos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </header>
    </div>
  );
}

export default App;
