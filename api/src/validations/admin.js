const { Joi } = require("express-validation");

module.exports = {
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(3).required(),
        }).required()
      },
}