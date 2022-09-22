const { trusted } = require("mongoose");
const User = require("../models/users-model");

let mesg = "";
let mesage = "";

const loginPage = (req, res) => {
  res.render("login/login", { message: mesg });
  mesg = "";
};

const signupPage = (req, res) => {
  res.render("signup/signup", { mesage: mesage });
  mesage = "";
};

const homePage = (req, res) => {
  res.render("home/home");
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email,password)
  const users = await User.findOne({ email, password });

  try {
    if (email == users.email && password == users.password) {
      res.redirect("/users/home");
    }
  } catch (error) {
    // res.status(500).send("error========================================")
    mesg = "Enter valide user name or password";
    res.redirect("/users/login");
  }
};

const signupPost = async (req, res, next) => {
  let userId = req.body.email;
  let findUser = await User.findOne({ email: userId });

  if (!findUser) {
    const { firstName, lastName, email, password } = req.body;
    let type;
    req.body.type ? (type = req.body.type) : (type = "user");
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      type,
    });
    try {
      await user.save();
      // res.send(user)
      res.redirect("/users/login");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    mesage = "user aldrady exist";
    res.redirect("/users/signup");
  }
};

const logoutGet = (req, res) => {
  res.redirect("/users/login");
};

const addAdmin = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let type;
  req.body.type ? (type = req.body.type) : (type = "user");
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    type,
  });
  try {
    await user.save();
    // res.send(user)
    res.redirect("/users/home");
  } catch (error) {
    res.status(500).send(error);
  }
};

const adAdmin = (req, res) => {
  res.render("home/addUser");
};

const viewUser = (req, res) => {
  res.render("home/showUser");
};

exports.loginPage = loginPage;
exports.signupPage = signupPage;
exports.loginPost = loginPost;
exports.signupPost = signupPost;
exports.logoutGet = logoutGet;
exports.homePage = homePage;
exports.addAdmin = addAdmin;
exports.adAdmin = adAdmin;
exports.viewUser = viewUser;
