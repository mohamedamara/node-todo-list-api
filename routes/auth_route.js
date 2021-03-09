const express = require("express");
const authController = require("../controllers/auth_controller");

const router = express.Router();

// @route     GET api/auth
// @desc      Get logged user
// @access    Private
router.get("/auth", authController.getLoggedUser);

// @route     POST api/auth
// @desc      Log in user and get token
// @access    Public
router.post("/auth", authController.loginUser);

module.exports = router;
