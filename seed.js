const mongoose=require('mongoose');
const employeeModel=require('./models/employee.js')
mongoose.connect(`mongodb://localhost:27017/employeedb`,{useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',err=>{
    console.log(`The error is ${err}`);
});

db.on('once',()=>{
    console.log("COnnected to database");
});
const employees=[  {name:{
    first_name:'john',
    middle_name:'noname',
    last_name:'doe'
},
email:'john@doe',
age:20
},{name:{
    first_name:'walter',
    middle_name:'danger',
    last_name:'white'
},
email:'walter@white',
age:45
},{name:{
    first_name:'jesse',
    middle_name:'something',
    last_name:'pinkman'
},
email:'jesse@pinkman',
age:23
}];
employeeModel.insertMany(employees).then(results=>{
    console.log(`${results} inserted successfully`);
    
}).catch(err=>{
    console.log(`${err} occurred`);
}).finally(()=>{
  
    mongoose.connection.close();
    console.log("Closed connection with database");
});
