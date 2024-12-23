const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require('./src/model');
const student = require("./src/router/student.router");
const admin = require("./src/router/admin.router");
const { ValidationError } = require("express-validation");
const PORT = process.env.PORT || 3000;
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


app.use("/v1", student);
app.use("/admin", admin);
app.get('/', (_, res) => {
  res.statusCode = 200;

  res.status(200).json({
    status: "Fail", message: "APIs are live"
  })
});

app.use((err, _req, res, _) => {
  console.log("I a insideeeeeeeeeeeeeeeeeeeeeeeeeeeee",err)
  if (err instanceof ValidationError) {
    if (err.details && err.details.body && err.details.body.length && err.details.body[0].message) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.details.body[0].message.replace(/"/g, ""),
      });
    } else {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        response: err,
      });
    }
  }

  return res.status(500).json(err);
});


db.sequelize.authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});