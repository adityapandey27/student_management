const _repo = require("../repository/repository")
const { Op } = require("sequelize");
const { generateToken } = require("../utils/jwtUtils")
const bcrypt = require("bcrypt");
const {ReE,ReS}=require("../utils/util.service")
module.exports = {
    findAdmin: async function (req, res) {
        try {
            console.log(req.body);
            let { email, password } = req.body;
            let studentDetail = await _repo.findDetail({ email });
            if (!studentDetail) {
                let error = new Error("Admin not found!");
                error.status = 404; 
                throw error;
            }
            const isPasswordMatch = await bcrypt.compare(password, studentDetail.password);
            console.log(isPasswordMatch);
            if (!isPasswordMatch) {
                let error = new Error("Invalid Credentials!");
                error.status = 401;
                throw error;
            }

            let token = generateToken(studentDetail);
            console.log(token);
            return { studentDetail, token }; 
        } catch (error) {
            throw error; 
        }
    },
};
