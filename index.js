const express = require("express");
const databaseConnection = require("./config/database_connection");

const app = express();
app.use(express.json({ extended: false }));
const port = process.env.PORT || 5000;

// connect to database
databaseConnection();

app.get("/", (req, res) => {
  res.json({ msg: "Hello from Todo list app" });
});

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
