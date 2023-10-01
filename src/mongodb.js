const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/LoginSignup")
.then(()=>{
    console.log("MongoDB Connected Succesfully!");
})
.catch(()=>{
    console.log("Failed to Connect!")
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("LogInCollection",LogInSchema)

module.exports=collection