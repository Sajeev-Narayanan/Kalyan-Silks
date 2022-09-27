const express = require("express");

const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const auth = require("../middleware/auth");

const path = require("path");

const router = express.Router();
router.use(express.static(path.join(__dirname, "public")));

router.use(express.static("public"));

router.get("/login", userControllers.loginPage);

router.get("/signup", userControllers.signupPage);

router.post("/login", userControllers.loginPost);

router.post("/signup", userControllers.signupPost);

router.use(auth);

router.get("/home", userControllers.homePage);

router.get("/logout", userControllers.logoutGet);

router.post("/addAdmin", userControllers.addAdmin);

router.get("/adAdmin", userControllers.adAdmin);

router.get("/viewUser", userControllers.viewUser);

router.get("/viewUserGet", userControllers.viewUserGet);

router.post("/search", userControllers.search);

router.delete("/deleteUser/:id", userControllers.deleteUser);

router.get("/editUser/:id/edit", userControllers.editUser);

router.put("/editUserPut/:id", userControllers.editUserPut);

router.get("/userPage", userControllers.userPage);

module.exports = router;
