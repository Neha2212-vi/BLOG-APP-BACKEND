const express = require("express");
const route = express.Router();
const blogModel = require("../models/blog");
const cloudinary = require('../database/cloudinaryConfig');

route.post('/blogs', (req, res) => {
   try {
      const file = req.files.image;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
         // console.log(result.secure_url);
         const { title, description } = req.body;
         const data = await blogModel.create({
            title,
            description,
            image: result.secure_url
         });
         res.status(200).json({data});
      })
   } catch (error) {
      console.log(error)
   }
});


route.get('/blogs', async (req, res) => {
   const data = await blogModel.find()
   res.send(data);
});

module.exports = route;