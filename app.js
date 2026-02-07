const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const dotenv=require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  console.log("connected");
  socket.on("disconnect", function () {
    io.emit("user-dissconnected", socket.id);
  });
});

app.get("/", (req, res, next) => {
  return res.render("index");
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
  {
    console.log(`this is running at http://localhost:${PORT}`);
  } 
});
