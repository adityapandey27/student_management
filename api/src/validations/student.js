const { Joi } = require("express-validation");

module.exports = {

  createStudent: {
    body: Joi.object({
      name: Joi.string()
        .min(1).required(),
      email: Joi.string()
        .email().required(),
      dob: Joi.date()
        .required().less('now'),
      branch: Joi.string()
        .valid('CSE', 'IT', 'ME', 'CE', 'AE', 'BT', 'Other').required(),
      semester: Joi.string()
        .valid(
          'first',
          'second',
          'third',
          'fourth',
          'fifth',
          'sixth',
          'seventh',
          'eighth'
        ).required()
    }).required()
  },
  updateStudent: {
    body: Joi.object({
      name: Joi.string().min(1)
        .optional(),
      email: Joi.string()
        .email()
        .optional(),
      dob: Joi.date()
        .optional()
        .less('now'),
      branch: Joi.string()
        .valid('CSE', 'IT', 'ME', 'CE', 'AE', 'BT', 'Other')
        .optional(),
      semester: Joi.string()
        .valid(
          'first',
          'second',
          'third',
          'fourth',
          'fifth',
          'sixth',
          'seventh',
          'eighth'
        )
        .optional(),
      photo: Joi.any()
        .optional()
    }).required()
  },

}