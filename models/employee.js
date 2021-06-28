const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
    name:{
        first_name:String,
        middle_name:String,
        last_name:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:Number,
    created_at:{
        type:Date,
        default:Date.now()
    }

})

const empModel=mongoose.model("Employee",employeeSchema);
module.exports=empModel;