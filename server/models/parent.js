const mongoose = require("mongoose")

const Parent = new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    password:{type:String , required:true}
},
{collection:"parents"})
const model = mongoose.model("parent" , Parent)

module.exports = model