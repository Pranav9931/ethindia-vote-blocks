const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Allow cross-origin requests
app.use(cors());
app.use(bodyParser.json()); // Use body-parser for parsing JSON in the request body

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
  },
});

app.post("/setUser", (req, res) => {
  const userData = req.body;

  // Broadcast the user data to all connected sockets
  io.emit("newVoterData", userData);

  // Send a response back to the client
  res.status(200).json({ message: "User data broadcasted successfully", userData });
});

io.on("connection", (socket) => {
  console.log("User Connected!");

  socket.on("newVoterData", (data) => {
    socket.broadcast.emit("newVoterData", data);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});
