const { ReE, ReS } = require("../utils/util.service");
const jwt = require("jsonwebtoken");
const _adminContoller = require("../services/admin")
const generateToken= require("../utils/jwtUtils")

module.exports = {
  login: async function (req, res) {
    
    try {

        let data=await _adminContoller.findAdmin(req,res);

        return ReS(res, "Login successful.",{token:data.token,type:'bearer'});
      } catch (error) {
        console.error("insde main fieleeeeeeeeeee",error);
        console.error("insde main fieleeeeeeeeeee",error.status);
        return ReE(res,error.message,error.status);
      }
    }
}