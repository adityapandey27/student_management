const {Admins} = require("../model/index");

module.exports = {

    findDetail:async(where)=>{
    return await Admins.findOne({where:where});
    }
  
}
