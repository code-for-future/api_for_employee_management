const dotenv=require('dotenv').config();
const port=process.env.PORT;
const express=require('express');
const router=require('./routers/employeerouter.js');
const app=express();
app.use(express.urlencoded({extended:true}));
const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/employeedb`,{useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',err=>{
    console.log(`Mongodb error ${err}`);
});

db.on('once',()=>{
    console.log(`Connected to database`);

})

app.use('/api',router);

app.listen(port,()=>{
    console.log(`Started listening on port ${port} for requests`);
});
