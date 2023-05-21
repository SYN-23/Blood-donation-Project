const mongoose=require('mongoose');

//schema creation for register new donor
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
    status:{
        type:Boolean,
        required:true,
    },
    lastDate:{
        type:String,
        required:true,
    },
    nextDate:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('registerDonor', userDetailsSchema);
