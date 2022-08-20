require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// require("./config/mongoose.config");
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`You are connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error))
