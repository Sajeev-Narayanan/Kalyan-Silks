const express = require("express");

const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

router.use(express.static("public"));

router.get("/login", userControllers.loginPage);

router.get("/signup", userControllers.signupPage);

router.post("/login", userControllers.loginPost);

router.post("/signup", userControllers.signupPost);

router.get("/home", userControllers.homePage);

router.get("/logout", userControllers.logoutGet);

router.post("/addAdmin", userControllers.addAdmin);

router.get("/adAdmin", userControllers.adAdmin);

router.get("/viewUser", userControllers.viewUser);

module.exports = router;
