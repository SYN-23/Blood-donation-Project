const mongoose=require('mongoose');

//schema creation for register new user
const userDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    pinCode:{
        type:Number,
        required:true,
    },
    bloodGroup:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('register', userDetailsSchema);
