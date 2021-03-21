const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const http = require("http");
const PORT = process.env.PORT || 5000


const app = express();
app.use(cors());

const server = http.createServer(app)


// user connects and disconnects to server
const io = socketIO(server)
// connects every user 
io.on("connection", (socket) => {
  console.log("new user connected");
  // send message
  socket.emit("new", {
    from: "Admin", 
    message: "welcome to chat app"
  })
  // sends message of new user connected
  socket.broadcast.emit("newUser", {
    from: "Admin",
    message: "New user connected"
  })
  // sends new message
  socket.on("newMessage", (data, callback) => {
    console.log(data)
    io.emit("message", {
      message: data.message,
      id: data.id
    })
    callback("Message Send From Server")
  })

// disconnects user when closing app
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

})


app.get("/", (req, res) => {
  res.send("hello from server")
})

server.listen(PORT, () => {
  console.log(`listening at port: http://localhost:${PORT}`)
})
