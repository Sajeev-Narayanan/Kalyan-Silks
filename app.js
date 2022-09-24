const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const userRoutes = require("./routes/users-routes");
const cookieParser = require("cookie-parser");
const filestore = require("session-file-store");
const session = require("express-session");

const app = express();

app.use(cookieParser());

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("show/show");
});

app.use("/users", userRoutes);

app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.get("*", (req, res, next) => {
  res.send("404, Not Found").status(404);
});

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/KalyanStaffs?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("listening----------------###");
    });
  })
  .catch((error) => {
    console.log(error);

    throw new Error(error);
  });
