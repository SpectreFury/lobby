require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.LOBBY_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("User wants to join: ", data.roomId);
    socket.join(data.roomId);

    socket.to(data.roomId).emit("join_confirmation", {
      roomId: data.roomId,
      user: {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        imageUrl: data.user.imageUrl,
      },
    });
  });

  socket.on("peer_joined", (data) => {
    socket.to(data.roomId).emit("receive_peer", data.id);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", {
      user: {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        imageUrl: data.user.imageUrl,
      },
      message: data.message,
    });
  });

  socket.on("send_audio", (data) => {
    console.log(data.stream);
    socket.to(data.roomId).emit("receive_audio", {
      stream: data.stream,
    });
  });
});

server.listen(5000, () => {
  console.log("Running on PORT 5000");
});
