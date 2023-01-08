require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const signupSchema = mongoose.Schema({
    email : {type : String, required: true},
    password :  {type : String, required: true},
    confirmPassword :  {type : String, required: true}
});

const signupModel = mongoose.model('user', signupSchema);

const validate = (data)=> {
    const schema = Joi.object({
        email : Joi.string().email().required().label("Email"),
        password : passwordComplexity().required().label("Password"),
        confirmPassword  : Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
    })
    return schema.validate(data);
}

module.exports = {signupModel, validate};