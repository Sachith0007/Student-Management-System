const express=require("express");         //declaring variables and assign it to dependencies before we installed in terminal.
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const app=express();
require("dotenv").config();


const PORT=process.env.PORT || 8080;  //set the port no for our application

app.use(cors());  //using dependencies before we declared
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;  //create a variable for store the mongodb URL

mongoose.connect(URL,{      //create a connection with mongodb

    // useCreateIndex:true,     //these are the connection options. they are not supported to new mongo 6 version.  idk is this ok or not, btw i have to remove those and after that code was run properly, need to find out is this ok or not...
    // useNewUrlparser:true,
    // useUnifiedTopologyL:true,
    // useFindAndModify:false
});

const connection = mongoose.connection; 

connection.once("open",() =>{  //opening the connection,before we created

    console.log("mongodb connection is success!!");  //if connection is ok at least once, print this.
})


app.listen(PORT,() =>{
    console.log('server is up and running on port :',PORT)  //if app is successfully connected to port.. then print this
})

const studentRouter= require("./routs/studentRoute.js"); //creating const var for access to routs file.

app.use("/Student",studentRouter); //using use function in express.. using this function we can access and use studentRoute file.
