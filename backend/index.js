const express = require("express");
const path = require("path");
const dotEnv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://kulucheh.ir');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api", require("./routes/adminRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, console.log(` Server Running On Port ${port}`));
