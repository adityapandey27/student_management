const {Students} = require("../model/index");

module.exports = {
    createBody: async (body) => {
        return await Students.create(body);
    },

    updateBody: async(body,where ) => {
        return await Students.update( body,where);
    },

    getList: async(filters) => {
        console.log("wherewherewherewhere",filters)
        return await Students.findAll({where:filters,paranoid: false,});
    },

    findDetail:async(where)=>{
    return await Students.findOne({where:where});
    },
    softDelete  : async (where) => {
        return await  Students.destroy({ where, paranoid: true });
      }

  
}
