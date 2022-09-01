const mongoose = require("mongoose")

const op = new mongoose.Schema({
    name:{type:String , required:true},
    regno:{type:Number , required:true},
    block:{type:String , required:true},
    room:{type:Number , required:true},
    destination:{type:String , required:true},
    days:{type:Number , required:true},
    from:{type:String , required:true},
    to:{type:String , required:true},
    reason:{type:String , required:true},
    status:{type:String,default:"Not Approved"}
},
    {collection:"outpassCollection"}
)
const model = mongoose.model("outpassData" , op)

module.exports = model