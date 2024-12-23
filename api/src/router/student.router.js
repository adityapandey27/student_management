const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const _validation =require("../validations/student.js")
const {authentication}=require("../middleware/authentication")
const _controller=require("../controller/controller.js")
const {upload}=require("../utils/fileupload.js")

router.post("/create",authentication,upload.single("photo"),validate(_validation.createStudent), _controller.createStudents);
router.put("/update-detail/:id",authentication,upload.single("photo"),validate(_validation.updateStudent), _controller.updateStudentDetail);
router.get("/students-list",authentication,_controller.studentList);
router.delete("/delete/:id", authentication, _controller.deleteStudent);

module.exports=router