require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const db = require("./database/models/");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "blog api",
      description: "node blog api",
      contact: { name: "sreevardhanreddi@gmail.com" },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT} ...`);
  });
});
