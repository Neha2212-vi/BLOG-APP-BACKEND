const route = require("express").Router();
const {signupModel} = require("../models/sign_up");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
require('dotenv').config();

route.post('/login', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            res.status(400).send({ message: error.details[0].message });
        }
        const user = await signupModel.findOne({email : req.body.email});
        if(!user){
           res.status(401).send({message : "Invalid Email_id or Password"})
        }
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if(!validPassword){
            return res.status(401).send({
                message : "Invalid Email_id or Password"
            })
        }

        const generateAuthToken = function () {
            const token = jwt.sign({_id: this._id},process.env.JWT_TOKEN, {expiresIn : "1h"} )
            return token;
        }
        const token = generateAuthToken();
        res.status(200).send({
            data : token,
            message : "Logged in successfully"
        })
        
    } catch(erro) {
        res.status(500).send({
        message: "Internal server error"
        })
    }
});

const validate = (data)=> {
    const schema = Joi.object({
        email : Joi.string().email().required().label("Email"),
        password : passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = route;