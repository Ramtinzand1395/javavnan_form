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
app.use(cors());
console.log(path.join(__dirname, "../frontend/index.html" , "index.html"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
  
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/adminRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, console.log(` Server Running On Port ${port}`));
