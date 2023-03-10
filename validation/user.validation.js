let joi = require("joi");

module.exports = {
  confirmPasswordValition: {
    body: joi
      .object()
      .required()
      .keys({
        email: joi
          .string()
          .email({
            maxDomainSegments: 2,
            tlds: {
              allow: ["com", "net", "org", "email"],
            },
          })
          .empty()
          .required()
          .messages({
            "any.required": "email is required",
            "string.email": "Please enter a valid email",
            "string.empty": "email field must be filled",
          }),
        password: joi
          .string()
          .required()
          .empty()
          .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
          .messages({
            "any.required": "password is required",
            "string.base": "Please enter a valid password",
            "string.empty": "password field must be filled",
            "string.pattern.base":
              "password must contain Minimum eight characters, at least one letter and one number",
          }),
      }),
  },
  addUserValidation: {
    body: joi
      .object()
      .required()
      .keys({
        firstName: joi
          .string()
          .required()
          .empty()
          .pattern(/^[a-z ,'-]+$/i)
          .messages({
            "string.base": "Please Enter a Valid Name",
            "string.empty": "Field Must Be Filled",
            "any.required": "Field is Required",
            "string.pattern.base": "name must contain [a-z ,.'-]",
          }),
        lastName: joi
          .string()
          .required()
          .empty()
          .pattern(/^[a-z ,'-]+$/i)
          .messages({
            "string.base": "Please Enter a Valid Name",
            "string.empty": "Field Must Be Filled",
            "any.required": "Field is Required",
            "string.pattern.base": "name must contain [a-z ,.'-]",
          }),
        userName: joi
          .string()
          .required()
          .empty()
          .min(3)
          .max(30)
          .alphanum()
          .messages({
            "string.alphanum": "Please Enter a Valid userName",
            "string.empty": "userName Field Must Be Filled",
            "any.required": "userName Field is Required",
            "string.min": "userName minimum length is 3",
            "string.max": "userName maximum length is 30",
          }),
        email: joi
          .string()
          .email({
            maxDomainSegments: 2,
            tlds: {
              allow: ["com", "net", "org", "email"],
            },
          })
          .empty()
          .required()
          .messages({
            "any.required": "email is required",
            "string.email": "Please enter a valid email",
            "string.empty": "email field must be filled",
          }),
        password: joi
          .string()
          .required()
          .empty()
          .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
          .messages({
            "any.required": "password is required",
            "string.base": "Please enter a valid password",
            "string.empty": "password field must be filled",
            "string.pattern.base":
              "password must contain Minimum eight characters, at least one letter and one number",
          }),
        isActive: joi.boolean().optional().messages({
          "boolean.base": "enter 'true' or 'false'",
        }),
        favTeam: joi
          .alternatives()
          .required()
          .try(
            joi.string().empty().required().messages({
              "string.base": "Please Enter a Valid Team Name",
              "string.empty": "Field Must Be Filled",
              "any.required": "Field is Required",
              "string.pattern.base": "team name must contain [a-z ,.'-]",
            }),
            joi
              .array()
              .min(2)
              .required()
              .items(
                joi.string().empty().required().messages({
                  "string.base": "Please Enter a Valid Team Name",
                  "string.empty": "Field Must Be Filled",
                  "any.required": "Field is Required",
                  "string.pattern.base": "team name must contain [a-z ,.'-]",
                })
              )
              .messages({
                "array.base": "you must enter array of teams' names",
                "array.min": "minimum array length is 2",
                "any.required": "array is required",
              })
          )
          .messages({
            "any.required": "favourite team name is required",
          }),
        age: joi.number().min(12).max(35).required().messages({
          "number.base": "age must be a number",
          "number.min": "minimum acceptable age is 12",
          "number.max": "maximum acceptable age is 35",
          "any.required": "age is required",
        }),
        role: joi.string().required().empty().messages({
          "string.base": "Please Enter a Valid Name",
          "string.empty": "Field Must Be Filled",
          "any.required": "Field is Required",
        }),
      }),
  },
  updateUserValidation: {
    body: joi
      .object()
      .required()
      .keys({
        firstName: joi
          .string()
          .optional()
          .empty()
          .pattern(/^[a-z ,'-]+$/i)
          .messages({
            "string.base": "Please Enter a Valid Name",
            "string.empty": "Field Must Be Filled",
            "string.pattern.base": "name must contain [a-z ,.'-]",
          }),
        lastName: joi
          .string()
          .optional()
          .empty()
          .pattern(/^[a-z ,'-]+$/i)
          .messages({
            "string.base": "Please Enter a Valid Name",
            "string.empty": "Field Must Be Filled",
            "string.pattern.base": "name must contain [a-z ,.'-]",
          }),
        userName: joi
          .string()
          .optional()
          .empty()
          .min(3)
          .max(30)
          .alphanum()
          .messages({
            "string.alphanum": "Please Enter a Valid Name",
            "string.empty": "Field Must Be Filled",
            "string.min": "minimum length is 3",
            "string.max": "maximum length is 30",
          }),
        email: joi
          .string()
          .email({
            maxDomainSegments: 2,
            tlds: {
              allow: ["com", "net", "org", "email"],
            },
          })
          .empty()
          .optional()
          .messages({
            "string.email": "Please enter a valid email",
            "string.empty": "email field must be filled",
          }),
        password: joi
          .string()
          .optional()
          .empty()
          .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
          .messages({
            "any.required": "password is required",
            "string.base": "Please enter a valid password",
            "string.empty": "password field must be filled",
            "string.pattern.base":
              "password must contain Minimum eight characters, at least one letter and one number",
          }),
        isActive: joi.boolean().optional().messages({
          "boolean.base": "enter 'true' or 'false'",
        }),
        favTeam: joi
          .alternatives()
          .optional()
          .try(
            joi.string().empty().required().messages({
              "string.base": "Please Enter a Valid Team Name",
              "string.empty": "Field Must Be Filled",
              "any.required": "Field is Required",
              "string.pattern.base": "team name must contain [a-z ,.'-]",
            }),
            joi
              .array()
              .min(2)
              .required()
              .items(
                joi.string().empty().required().messages({
                  "string.base": "Please Enter a Valid Team Name",
                  "string.empty": "Field Must Be Filled",
                  "any.required": "Field is Required",
                  "string.pattern.base": "team name must contain [a-z ,.'-]",
                })
              )
              .messages({
                "array.base": "you must enter array of teams' names",
                "array.min": "minimum array length is 2",
                "any.required": "array is required",
              })
          ),
        age: joi.number().min(12).max(35).optional().messages({
          "number.base": "age must be a number",
          "number.min": "minimum acceptable age is 12",
          "number.max": "maximum acceptable age is 35",
        }),
        role: joi.string().optional().empty().messages({
          "string.base": "Please Enter a Valid Name",
          "string.empty": "Field Must Be Filled",
          "any.required": "Field is Required",
        }),
      }),
  },
};
