const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New connection!!");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

app.use(cors());

app.use(router);

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
