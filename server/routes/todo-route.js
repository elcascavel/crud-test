const express = require("express");

const todoRoutes = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", todoRoutes.getAllTodos);

router.post("/create", todoRoutes.createTodo);

router.put("/update/:todo_id", todoRoutes.updateTodo);

router.delete("/delete/:todo_id", todoRoutes.deleteTodo);

module.exports = router;
