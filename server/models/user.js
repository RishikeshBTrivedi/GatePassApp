const mongoose = require("mongoose")

const User = new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    password:{type:String , required:true}
},
{collection:"users"})
const model = mongoose.model("user" , User)

module.exports = model