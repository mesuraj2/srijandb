const Express = require("express");
const User=require('./auth')
const Connecttomongodb=require('./db')
const cors=require('cors')
const Chat=require('./chat')
const Message=require('./message')
const Offer=require('./offer')


Connecttomongodb();
const app = Express();

const PORT = process.env.PORT || 3001;
app.use(cors({origin:'http://localhost:3000'}))

app.use(Express.json());

app.use("/api/auth",User);
app.use("/api/chat",Chat)
app.use("/api/message",Message)
app.use("/api/offer",Offer)


const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData)
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // console.log(newMessageRecieved)
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      console.log(user._id)
      if (user._id == newMessageRecieved.sender._id) return;
      // console.log("suraj")
      socket.in(user._id).emit("message recieved", newMessageRecieved);
      // socket.emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
