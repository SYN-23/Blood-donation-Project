const mongoose=require('mongoose');

//schema creation for user to donor request
const userDetailsSchema=new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true, 
    },
    userPinCode:{
        type:Number,
        required:true,
    },
    userPhoneNumber:{
        type:Number,
        required:true,
    },
    userBloodGroup:{
        type:String,
        required:true,
    },
    donorEmail:{
        type:String,
        required:true,
    },
    donorName:{
        type:String,
        required:true,
    },
    donorPinCode:{
        type:Number,
        required:true,
    },
    donorPhoneNumber:{
        type:Number,
        required:true,
    },
    donorBloodGroup:{
        type:String,
        required:true,
    },
    
    
})

module.exports = mongoose.model('donorToUserRequest', userDetailsSchema);