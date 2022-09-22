const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users-routes");

const app = express();

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

// let meg=""

app.get("/", (req, res, next) => {
  res.render("show/show");
});

app.use("/users", userRoutes);

// app.get('/login',(req,res,next)=>{
//   res.render("login/login",{message:meg})
// })

// app.post('/login',(req,res,next)=>{
//   const {email, password } = req.body;

// })
// console.log(email,password)

// app.get('/signup',(req,res,next)=>{
//   res.render("signup/signup")
// })

// app.post('/signup',(req,res,next)=>{
//   const { firstName,lastName,email, password } = req.body;
//   console.log(firstName,lastName,email,password)
// })

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
