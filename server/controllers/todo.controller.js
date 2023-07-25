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
