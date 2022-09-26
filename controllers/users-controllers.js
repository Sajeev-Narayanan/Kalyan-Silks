const { trusted } = require("mongoose");
const User = require("../models/users-model");

let mesg = "";
let mesage = "";
let showuser = "";

// loginpage get #####################

const loginPage = (req, res) => {
  if (req.cookies.userId && req.cookies.userType == "admin") {
    res.redirect("/users/home");
  } else if (req.cookies.userId) {
    res.redirect("/users/userPage");
  }
  res.render("login/login", { message: mesg });
  mesg = "";
};

// signup page get ########################

const signupPage = (req, res) => {
  res.render("signup/signup", { mesage: mesage });
  mesage = "";
};

// admin home page ###########################

const homePage = (req, res) => {
  if (req.cookies.userId && req.cookies.userType == "admin") {
    res.render("home/home");
  } else {
    res.redirect("/users/userPage");
  }
};

// login post method ###############################

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email,password)
  const users = await User.findOne({ email, password });

  try {
    if (email == users.email && password == users.password) {
      if (users.type == "admin") {
        res.cookie("userId", email, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("userType", users.type, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });
        if (req.cookies.userType == "admin") {
          res.redirect("/users/home");
        } else {
          res.redirect("/users/login");
        }
      } else {
        res.cookie("userId", email, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("userType", users.type, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });

        res.redirect("/users/userPage");
      }
    }
  } catch (error) {
    // res.status(500).send("error========================================");
    mesg = "Enter valide user name or password";
    res.redirect("/users/login");
  }
};

const userPage = async (req, res) => {
  const showuser = await User.find({}).sort({ firstName: 1 });
  res.render("user/user", { showuser });
};

const signupPost = async (req, res, next) => {
  let userId = req.body.email;
  let findUser = await User.findOne({ email: userId });

  if (!findUser) {
    let { firstName, lastName, email, password } = req.body;
    let typ = req.body.type;
    // typ = typ.trim();
    password = password.trim();
    email = email.trim();
    console.log(email);
    let type;
    req.body.type ? (type = typ) : (type = "user");
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
  res.clearCookie("userId");
  res.clearCookie("userType");
  res.redirect("/users/login");
};

const addAdmin = async (req, res, next) => {
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
      if (req.cookies.userType == "admin") {
        res.redirect("/users/home");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    mesage = "user aldrady exist";
    res.redirect("/users/adAdmin");
  }
};

const adAdmin = (req, res) => {
  res.render("home/addUser", { mesage: mesage });
  mesage = "";
};

const viewUser = async (req, res) => {
  showuser = await User.find({}).sort({ firstName: 1 });
  res.redirect("/users/viewUserGet");

  // res.render("home/showUser", { showuser });
};

const viewUserGet = async (req, res) => {
  res.render("home/showUser", { showuser: showuser });
  showuser = await User.find({}).sort({ firstName: 1 });
};

const search = async (req, res) => {
  const srh = req.body.search;
  showuser = await User.find({
    $or: [
      { firstName: { $regex: ".*" + srh + ".*" } },
      { lastName: { $regex: ".*" + srh + ".*" } },
      { type: { $regex: ".*" + srh + ".*" } },
    ],
  }).sort({ firstName: 1 });

  res.redirect("/users/viewUserGet");
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    await User.findByIdAndDelete(userId);
    res.redirect("/users/viewUser");
  } catch (error) {}
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.render("home/editUser", { user });
};

const editUserPut = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect("/users/viewUser");
};

exports.signupPage = signupPage;
exports.loginPost = loginPost;
exports.signupPost = signupPost;
exports.logoutGet = logoutGet;
exports.homePage = homePage;
exports.addAdmin = addAdmin;
exports.adAdmin = adAdmin;
exports.viewUser = viewUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.editUserPut = editUserPut;
exports.loginPage = loginPage;
exports.userPage = userPage;
exports.viewUserGet = viewUserGet;
exports.search = search;
