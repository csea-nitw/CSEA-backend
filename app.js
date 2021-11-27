require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const responseRoutes = require("./routes/response");
// DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(function (err) {
    console.error("MongoDB event error: " + err);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", testRoute);
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api", responseRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
