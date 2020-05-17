const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoute");
const menuRoute = require("./routes/menuRoute");
const orderRoute = require("./routes/orderRoute");
const globalErrorHandler = require("./controllers/errorController");

const corsOption = {
  origin: "https://myyummipizzaapp.herokuapp.com",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("pizza website backend");
});

app.use("/api/auth", authRoute);
app.use("/api/menu", menuRoute);
app.use("/api/orders", orderRoute);

app.use(globalErrorHandler);
module.exports = app;
