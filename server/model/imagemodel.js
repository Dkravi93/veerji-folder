const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    }
},
{
    versionKey : false,
    timestamps : true,
})

module.exports = mongoose.model("Images" , imageSchema);