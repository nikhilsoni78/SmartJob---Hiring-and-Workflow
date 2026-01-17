require("dotenv").config();
//imports
const connectDb = require("./Config/Db");
const express = require("express");
const userRouter = require("./Routes/UserRoute");
const jobRouter = require("./Routes/JobRoute");
const ApplicationRouter = require("./Routes/ApplicationRoute.js");
const errorHandler = require("./Middlewares/CustomErrorMiddleware");
const authMiddleware = require("./Middlewares/AuthMiddleware.js");

// Express App
const app = express();
app.use(express.json());

//Middlewares
app.use("/api/auth", userRouter);
app.use("/api/jobs", authMiddleware, jobRouter);
app.use("/api/application",authMiddleware, ApplicationRouter);

app.use(errorHandler);

//Port
const port = process.env.PORT || 3000;

//Main Function
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();