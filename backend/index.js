const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (roomId) => {
    console.log("User wants to join: ", roomId);
    socket.join(roomId);
  });

  socket.on("message", (data) => {
    socket.to(data.room).emit("clientMessage", data.message);
  });
});

server.listen(5000, () => {
  console.log("Running on PORT 5000");
});
