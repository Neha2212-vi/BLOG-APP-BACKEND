const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose.connect(process.env.URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    writeConcern: { w: 'majority', j: true, wtimeout: 1000 } 
})
.then(()=>{
    console.log("Connected successfully")
}).catch((error)=>{
    console.log(error)
});

