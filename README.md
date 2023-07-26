0. Create server folder.
1. Initialize a new Node.js project `npm init -y`
2. Install required packages: `express sqlite3 knex cors`
3. Install `nodemon -D` (-D is dev dependency)

- Use sqlite because it's an embedded db (no need to worry about hosting it externally). Useful to create a db on the spot. Other situations MySQL or PostgreSQL or for noSQL use Mongo.

4. Create a server.js file.

5. `npx create-react-app client` to create a React project inside the client folder

6. Go back to the server.js file

```js
const express = require("express");
const cors = require("cors");

// Import routes - example below
const todoRoutes = require("./routes/todo-route");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

7. utils folder with db.js file and db folder with database.sqlite file

```js
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/database.sqlite");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("todos")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("todos", (table) => {
          table.increments("todo_id").primary();
          table.string("title");
          table.string("description").nullable();
          table.boolean("completed").defaultTo(false);
        })
        .then(() => {
          console.log("Table 'Todos' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("Database setup successful.");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

module.exports = knex;
```

8. controllers folder

```js
const knex = require("../utils/db");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await knex.select("*").from("todos");
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await knex("todos").insert(req.body);

    const todo = await knex("todos").where("todo_id", newTodo[0]).first();

    res.json({ message: "Todo created successfully", ...todo });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todo_id;

    const todoExists = await knex("todos").where("todo_id", todoId).first();

    if (!todoExists) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await knex("todos").where("todo_id", todoId).update(req.body);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todo_id;
    const todoExists = await knex("todos").where("todo_id", todoId).first();

    if (!todoExists) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await knex("todos").where("todo_id", req.params.todo_id).del();

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
```

9. routes folder with route file - example below

```js
const express = require("express");
const todoRoutes = require("../controllers/todo.controller");
const router = express.Router();

router.get("/", todoRoutes.getAllTodos);
router.post("/create", todoRoutes.createTodo);
router.put("/update/:todo_id", todoRoutes.updateTodo);
router.delete("/delete/:todo_id", todoRoutes.deleteTodo);

module.exports = router;
```

10. frontend - create functions for create, update and delete

```js
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
```
