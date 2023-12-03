require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./config/db.js");

const app = express();

connectToDb();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 5005;

app.use("/user", require("./src/router/user.js"));
app.use("/employee", require("./src/router/employee.js"));

app.listen(PORT, () => {
  console.log(`Server engaged http://localhost:${PORT}`);
});
