const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todo-route");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
