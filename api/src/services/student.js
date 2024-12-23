// const {Students} = require("../model/index")
const _repo = require("../repository/repository")
const { Op } = require("sequelize");

module.exports = {
    createStudent: async function (body) {
        try {
        
            let {email}=body;
            let where={
                email
            }
            
            let studentDetail=await _repo.findDetail(where)
            if(studentDetail)
                {
                    let error = new Error("Admin not found!");
                    error.status = 409; 
                    throw error;
                }
              
            await _repo.createBody(body);

            return { message: "Student created successfully!!" }
        } catch (error) {
            return error
        }
    },
    getStudent: async function (query) {
        try {
            const { name, semester } = query;
            const filters = {};
            if (name) {
                filters.name = {
                    [Op.like]: `${name}%`,
                }
            }
            
            if (semester) {
                filters.semester = semester;
            }
            
            console.log(filters)
            let data = await _repo.getList(filters);

           

            return data
        } catch (error) {
            
            throw new Error("Something went wrong")
        }
    },
    updateStudent: async function (body) {
        try {
            let {id}=body;
            console.log("id",id)

            let where={
                id
            }
            console.log("where",where)
          
            let data=await _repo.updateBody(body,
            {
                where:where
            });
            if (data[0] === 0) {
                let error = new Error("Student not found or no changes were made.");
                error.status = 400; 
                throw error;
              }
            return data
        } catch (error) {
            throw error

        }
    },
    deleteStudent: async function (id) {
        try {
          let where = { id };
    
          const result = await _repo.softDelete(where);
    
          if (result === 0) {
            throw new Error("Student not found.");
          }
    
          return { message: "Student deleted successfully." };
        } catch (error) {
          throw error;
        }
      },
}