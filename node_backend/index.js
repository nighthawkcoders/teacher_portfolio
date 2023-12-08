const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("connected")
  socket.on("update", (data) => {
    console.log(data)
    io.emit("stateUpdate", data)
  })
});

io.listen(3000);