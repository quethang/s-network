require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require('./socketServer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

//Route
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

//connect MongoDB (sẽ tách ra file riêng)
const URL = process.env.MONGODB_URL;
async function connect() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connect();
//

const port = process.env.PORT || 5000;

// listen port
http.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
