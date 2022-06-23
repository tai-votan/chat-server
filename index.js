var express = require('express')
const http = require("http");
var app = express();
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3001/",
        // "Access-Control-Allow-Origin": "*",
        methods: ["GET", "POST"],
    }
  });


socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const { PORT = 3000 } = process.env

server.listen(PORT, () => {
    console.log(`Server đang chay tren cong ${PORT}`);
});

