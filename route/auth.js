const Joi = require('joi');
const express = require("express");
const { signup,login } = require("../controller/auth.js");
const validateSchema  = require("../middleware/validateSchema.js")
const router = express.Router();

const SignupSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .max(255)
        .required(),
    email:Joi.string()
        . email()
        .required(),
    password:Joi.string()
        .required(),
    role: Joi.string()
        .required()
    

});

const loginSchema = Joi.object({
   
    email:Joi.string()
        . email()
        .required(),
   password: Joi.string()
    .required(),

});

router.post("/signup",validateSchema(SignupSchema),signup);
router.post("/login",validateSchema(loginSchema),login);

module.exports = router;