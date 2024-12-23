const { ReE, ReS } = require("../utils/util.service");
const jwt = require("jsonwebtoken");
const _studentController = require("../services/student")


module.exports = {
  createStudents: async function (req, res) {
    try {
      console.log("req.file=========",req.file.filename)
      let photo=req.file.filename
      delete req.body.photo
      req.body={...req.body,photo}
      let { message } = await _studentController.createStudent(req.body);

      return ReS(res, message);
    } catch (error) {
      return ReE(res, error.message,error.status);
    }
  },

  updateStudentDetail: async function (req, res) {
    try {

    const { id } = req.params; 
    if (!id) {
      return ReE(res, "Student ID is required for updating details.",404);
    }
    let photo=req.file.filename
    delete req.body.photo
    req.body={...req.body,photo}
    const updateData = { ...req.body, id };

      _studentController.updateStudent(updateData);

       return ReS(res,"Student detail updated Successfully")
    } catch (error) {
      console.error(error);
      return ReE(res, error.message,error.status );
    }
  },

  studentList: async function (req, res) {
    try {

      let response  = await _studentController.getStudent(req.query);

      return ReS(res, {count:response.length,response});
    } catch (error) {
      console.error(error);
      return ReE(res, error.message);
    }
  },
  deleteStudent: async function (req, res) {
    try {
      const { id } = req.params; 
      if (!id) {
        return ReE(res, "Student ID is required for deletion.", 404);
      }

      let { message } = await _studentController.deleteStudent(id);
      return ReS(res, message);
    } catch (error) {
      console.error(error);
      return ReE(res, error.message, error.status);
    }
  },


}
