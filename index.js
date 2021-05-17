const express = require("express");
const cors = require("cors");
const databaseConnection = require("./config/database_connection");
const usersRoute = require("./routes/users_route");
const authRoute = require("./routes/auth_route");
const todosRoute = require("./routes/todos_route");

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
const port = process.env.PORT || 5000;

databaseConnection();

app.use("/api", usersRoute);
app.use("/api", authRoute);
app.use("/api", todosRoute);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require("./config/socket_io_connection").init(server);

io.on("connection", (socket) => {
  console.log("Socket.io client connected");
});
