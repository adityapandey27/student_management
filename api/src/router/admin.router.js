const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const _admin =require("../validations/admin.js")
const _controller=require("../controller/controller.js")


router.post("/login",validate(_admin.login), _controller.login);


module.exports=router