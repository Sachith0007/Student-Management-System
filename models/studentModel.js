const mongoose= require('mongoose'); //adding mongoose dependancy before we installed.
const schema=mongoose.Schema;

const studentSchema = new schema({   

    name :{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const student = mongoose.model("Student", studentSchema);  //creating constant variable and addit to mongoose.model. it is asome library using in mongoose. after that we given it to 2 paramiters. first one is should be table/ document name,its mean database name and 2nd one is which data we are going to input for the table. in here studentscehma mean sheschema above we created.
module.exports=student; //this is a imported thing.we should export this model beacuse we need to use this tables and everything in future works.