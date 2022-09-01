const express = require("express")
const app = express();
const cors = require("cors")
const User = require("./models/user")
const Outpass = require("./models/outpass")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const { json } = require("express");
const Parent = require("./models/parent")
app.use(cors())//for cross origin
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/outpassLoginDB")

app.post("/login",async(req,res) => {
    
    const user = await User.findOne({username:req.body.username,
        password:req.body.password})
    if(user) {
        console.log(req.body.username+" logged in")
        const token = jwt.sign({
            username:user.username,
        },"ghsmujhostel")//ghsmujhostel is the secret
        console.log(token)
        return res.json({status:'ok',user:token})//token is base64 encoded
        
    }else{
        console.log(req.body.username+" is a invalid username")
        return res.json({status:"error" , user:false})
    }
    
})
app.get("/GenerateOutpass", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username = decoded.username
        const user = await User.findOne({username:username})
        console.log("User -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        console.log(UserData)
        console.log(UserData.name)
        console.log(UserData.block)
        return res.json({status:"ok" , name:UserData.name , regno:UserData.regno , room:UserData.room , block:UserData.block})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/GenerateOutpassRecords", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await Parent.findOne({username:username_p})
        
        console.log("Parent -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno
        const outpassData = await Outpass.find({regno:child , status:"Not Approved"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/GenerateOutpassRecords_Accepted", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await Parent.findOne({username:username_p})
        
        console.log("Parent -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno;
        const outpassData = await Outpass.find({regno:child , status:"Approved by Parent"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/GenerateOutpassRecords_Declined", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await Parent.findOne({username:username_p})
        
        console.log("Parent -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno;
        const outpassData = await Outpass.find({regno:child , status:"Declined by Parent"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/StudentOutpassRecords", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await User.findOne({username:username_p})
        
        console.log("Student -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno
        const outpassData = await Outpass.find({regno:child , status:"Not Approved"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/StudentOutpassRecords_Accepted", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await User.findOne({username:username_p})
        
        console.log("Student -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno;
        const outpassData = await Outpass.find({regno:child , status:"Approved by Parent"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.get("/StudentOutpassRecords_Declined", async(req,res) => {
    const token = req.headers["x-access-token"]
    
    try{
        const decoded = jwt.verify(token , "ghsmujhostel")
        console.log("Token -> "+token)
        console.log(decoded.username)
        const username_p = decoded.username
        console.log("Username -> "+username_p)
        const user = await User.findOne({username:username_p})
        
        console.log("Student -> "+user)
        let UserData = JSON.stringify(user)
        console.log(UserData)
        UserData = JSON.parse(UserData)
        const child = UserData.regno;
        const outpassData = await Outpass.find({regno:child , status:"Declined by Parent"})
        let test = JSON.stringify(outpassData)
        console.log("test -> "+test)
        // test = JSON.parse(test)
        // console.log("parsed test -> "+test)
        console.log(outpassData)
        // console.log(outpassData[0].destination)
        return res.json({status:"ok" ,data:outpassData})
        // return res.json({status:"ok" ,data:test})
        // return res.json({status:"ok" , data:UserData})
    }catch(error){
        console.log(error)
        res.json({status:"error" , error:error})
    }
})
app.post("/parentLogin",async(req,res) => {
    
    const user = await Parent.findOne({username:req.body.username,
        password:req.body.password})
    if(user) {
        console.log(req.body.username+" logged in")
        const token = jwt.sign({
            username:user.username,
        },"ghsmujhostel")//ghsmujhostel is the secret
        console.log(token)
        return res.json({status:'ok',user:token})//token is base64 encoded
        
    }else{
        console.log(req.body.username+" is a invalid username")
        return res.json({status:"error" , user:false})
    }
    
})
app.post("/changeOutpassClass" , async(req,res) => {
    try{
        console.log("id:"+req.body._id)
        console.log("status:"+req.body.status)
        await Outpass.updateOne({_id:req.body._id},
            {status:req.body.status})
        res.json({status:"ok"})
        console.log("Successfully Updated")
    }catch(err){
        console.log(err)
        res.json({status:"error" , error:"something went wrong"})
    }
})
app.post("/submitOutpass" , async(req,res) => {
    try{
        const outpass = await Outpass.create({
            name:req.body.name,
            regno:req.body.regno,
            room:req.body.room,
            block:req.body.block,
            destination:req.body.destination,
            days:req.body.days,
            from:req.body.from,
            to:req.body.to,
            reason:req.body.reason,
            status:req.body.status
        })
        res.json({status:"ok"})
    }catch(err){
        console.log(err)
        res.json({status:"error" , error:"something went wrong"})
    }
})
app.listen(5000 , () => {
    console.log("Server Running on port 5000")
})