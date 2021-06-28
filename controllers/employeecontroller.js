const mongoose=require('mongoose');
const mongo=require('mongo');
const Employee=require('../models/employee.js');
exports.createEmployee=(req,res)=>{
   // console.log(req.body);
   const employee=new Employee({
       name:{
           first_name:req.body.name.first_name,
           middle_name:req.body.name.middle_name,
           last_name:req.body.name.last_name
       },
       email:req.body.email,
       age:req.body.age
   });
   Employee.create(employee).then(employee=>{
       console.log("Employee created successfully");
       res.json(employee);
    }).catch(err=>{
           console.log(`Employee could not be saved error is ${err}`);
           res.status(500).json({"message":"Internal server error"});
       });
    }

    exports.findAllEmployees=async (req,res)=>{
        try{
            const emp=await Employee.find({}).exec();
            res.json({"employees":emp});
        }
        catch(err)
        {
            res.json({error:"Some error occurred"});
        }
    }
     
exports.getEmployee=async (req,res)=>{
    //console.log(req.params);
   // console.log(mongoose.isValidObjectId(req.params.id));
    if(mongoose.isValidObjectId(req.params.id)){
   try{
    const emp_id=mongoose.Types.ObjectId(req.params.id);
   const emp=await Employee.findOne({"_id":emp_id});
   if(!emp)
   {
       res.json({"message":"No user found with id!"});
   }
   else{
   res.status(200).json(emp);
   }
   
   }
   catch(err){
       console.log(err);
      res.json({error:"Internal Server Error"});
      
   }
    }
    else{
        res.status(404).json({error:"Resource not found"});
    }


}
exports.updateEmployee= async (req,res)=>{
    
    //console.log(req.params.id);
    if(mongoose.isValidObjectId(req.params.id))
    {
        try{
            const emp_id=mongoose.Types.ObjectId(req.params.id);
            const filter={_id:emp_id};
            
           
        const emp=await Employee.findOneAndUpdate(filter,{$set:req.body},{new:true});
        if(!emp)
        {
            res.status(404).json({message:"No employee found"});
        }
        else{
            console.log(`Update successful`);
        res.status(200).json(emp);
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }

 
}
else{
    res.status(404).json({message:"Invalid id"});
}
}

exports.deleteEmployee=async (req,res)=>{
    if(mongoose.isValidObjectId(req.params.id))
    {
        try{
        const emp_id=mongoose.Types.ObjectId(req.params.id);
        const emp=await Employee.findOneAndDelete({_id:emp_id});
        if(!emp)
        {
            res.status(404).json({"message":"Employee cant be deleted"});
        }
        else{
            res.status(200).json(`Employee ${emp} deleted successfully!`);
        }
    }
    catch(err)
    {
        res.status(500).json({"message":"Internal server error"})
    }
}
else{
    res.status(404).json({error:"Invalid id"});
}
}