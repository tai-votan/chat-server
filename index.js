var express = require("express");
const http = require("http");
var app = express();
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer(app);

const socketIo = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
  // transports: ["websocket", "polling", "flashsocket"],
});

//
// const socketIo = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
//   transports: ["websocket", "polling", "flashsocket"],
// });

var a = "hello";

socketIo.on("connection", (socket) => {
  a = 'bbbbbbbbbb'

  socket.on("sendDataClient", function (data) {
    a = 'zzzzzzzzzzzzz'
    a = data
    // socketIo.emit("sendDataServer", { data });
  });
  // socket.emit("getId", a);
});

//
// socketIo.on("connection", (socket) => {
//   a = "google bye";
//   console.log("New client connected" + socket.id);
//
//   socket.emit("getId", socket.id);
//
//   socket.on("sendDataClient", function (data) {
//     console.log(data);
//     socketIo.emit("sendDataServer", { data });
//   });
//
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
  res.send(a);
});

server.listen(PORT, () => {
  console.log(`Server đang chay tren cong ${PORT}`);
});
