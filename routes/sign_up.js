require('dotenv').config();
const express = require("express");
const route = express.Router();
const {signupModel, validate} = require("../models/sign_up.js");
const bcrypt = require('bcrypt');

route.post('/signup', async (req, res) => {
    // console.log(req.body);
    try {
        const {error} = validate(req.body);
        if(error)
           return res.status(400).send({message : error.details[0].message});
        
        const user = await signupModel.findOne({
            email : req.body.email
        });
        if(user)
           return res.status(409).send({message : "This Email_id already exist"});
        

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new signupModel({...req.body, password:hashPassword}).save();
            res.status(201).send({
            message : "User created successfully"
        })
        
    } catch (error) {
       res.status(500).send({
        message : "Internal server error"
       }) 
    }
});

module.exports = route;