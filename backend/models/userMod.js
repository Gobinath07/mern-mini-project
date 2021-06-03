const mongoose = require('mongoose')
  


const userSchema =new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true

    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        trim:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true

    },
    role:{
        type:Number,
        default:0
    },
    salt:String,
  

    resetPasswordLink:{
        data:String,
        default:""
    }
},{timeStamp:true},
{collection:'users'}
)

module.exports=mongoose.model("User",userSchema)

