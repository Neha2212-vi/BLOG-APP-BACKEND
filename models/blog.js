const mongoose = require("mongoose");

const blogSchema =new mongoose.Schema({
    title : {
        type:String
     },
    image : {
       type:String
    },
    description : {
        type:String
     }

});

const blogModel = mongoose.model('blogData', blogSchema);
module.exports = blogModel;