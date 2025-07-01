const mongoose = require ('mongoose')
require('dotenv').config();

const connnectDb= async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
             useUnifiedTopology: true

        });
        console.log("Connected to mongodbAtlas");
        
        
    } catch (err) {
        console.log("ERROR IN CONNECTION ", err);
        process.exit(1);
        
        
    }
};
module.exports= connnectDb