
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());


require('dotenv').config();cd
const PORT=process.env.PORT||3000;
app.use(express.json());
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
//if error
db.on('error',(error)=>{
    console.log(error)
})
app.use('/user',require('./api/routes/user'))

db.once('open',()=>{console.log('added')});

app.use(express.urlencoded({extended:false}));

app.use('/add',require('./api/routes/add-data') )

app.use((req,res,next)=>{
    res.status(404).json({
        error: 'bad request'
    })
})
app.listen(PORT,()=>{
    console.log("Server connceted");
})