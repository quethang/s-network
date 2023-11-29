require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Route
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use('/api', require('./routes/commentRouter'));

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
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
