require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const db = require("./database/database");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join((__dirname, "public"))));
app.use(logger("combined"));

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

app.use("/auth/", authRoutes);
app.use("/blogs/", blogRoutes);

const PORT = process.env.PORT || 8080;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT} ...`);
  });
});
