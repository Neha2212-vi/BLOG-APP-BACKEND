const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./database/conn");
const login = require("./routes/login");
const signup = require("./routes/sign_up");
const blog = require("./routes/blog");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload({
    useTempFiles:true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(signup);
app.use(login);
app.use(blog);

app.listen(5000, console.log("Server is up at port 5000"));