const express = require("express");
const databaseConnection = require("./config/database_connection");
const usersRoute = require("./routes/users_route");
const authRoute = require("./routes/auth_route");
const todosRoute = require("./routes/todos_route");

const app = express();
app.use(express.json({ extended: false }));
const port = process.env.PORT || 5000;

// connect to database
databaseConnection();

app.get("/", (req, res) => {
  res.send("Welcome to the todo list api");
});

// middlewares to handle different routes
app.use("/api", usersRoute);
app.use("/api", authRoute);
app.use("/api", todosRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
