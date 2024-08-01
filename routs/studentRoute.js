const router= require("express").Router();  //11th line eke use karal thyenne mee router kiyala  hadagtta variable eka. mee variable eke thiyenne express framework eka.
let studentvar= require("../models/studentModel");

//creating crud operations..

//***...create...***


//http://localhost:8080/student...  me link eken thama ape mee studentRoute kiyana file eka load karaganne. server.js eke37,39 line dekedi api qwane studentRoute eka access karanna api /student kiyana eka use krnw kiyala. 
//api dan crud 4k create krnw. ethakot ekama url eken ee crud 4t m access wennn ba ne, ethakot e 4t wenama url 4k ona.
//in here we afre use post method
router.route("/add").post((req,res)=>{     //methanadinm http://localhost:8080/student/add.. meke mee ("/add") kiyal parameter ekak dila thyenne ekata thamai.. URL eka hadenna.  anyone call this http://localhost:8080/student/add url from front end... then this create route will be execute.

    const name=req.body.name;     //these name,age amd gender are table'scolumns before we created in models. in here we get user input data via request body, from front-end.
    const age=Number(req.body.age);
    const gender=req.body.gender;

    const newStudent= new studentvar({
        name,                         // uda req eken gatta name age, gender kiyana data 3 mee newStudent kiyana object ekata dagnnwa.
        age,
        gender
    })

    newStudent.save().then(()=>{   //now, ee hadagtta object eka mongodb database ekata pass karanawa save method eka use karala.(modelseka harahayawanne..)..then mean its like a if condition.we sent data to database, if it sucess mhm wenna, ehma nathnm mhm wenna kiyala rrow function ekak dala kiyanna hdanne
        
       res.json("STUDENT ADDED!")   //data successfully save una nm response ekak yawanwa jason format eken front end ekata student added kiyala

    }).catch((err)=>{     //its behave like else.if is not working, then catch the error and print it.
       
        console.log(err);
    })             
})


//***...read...***

//in here we are using get method. because we are going to read data

router.route("/").get((req,res)=>{                  //http://localhost:8080/student.. methana mama parameter ekavidiyata dila thyenne ("/").. ethakot link eka wenas wenne naa. ee link ekmi,mm display kiyala dunnot likn eka http://localhost:8080/student/display wnw.but mm meka mhmm thyennn denwa.mkd normallink eken log unamai, apita data read krnna ona unamai dekedim thyennne ekama tab eka. default thyennet mee data viewing tab ekene application eka. so this is ok.
                                    
    studentvar.find().then((students)=>{              //students kiyala arrow function ekak hadagnnw. 
          
         res.json(students)                           //front end ekata denwa json format eken database eken ena student la.
    }).catch((err)=>{

        console.Console.log(err)
    })

})     


//***...update...***


//http://localhost:8080/student/update/id7812adabacb

router.route("/update/:id").put(async(req,res)=>{   //.post() ekath ok.......("/update/:id"), mekedi slash'/' ekata passe colun ':' eka aniwa danna. eken dammot vtri update krddi apita back end eken ewana url eke thiyena student id eka wenama galawala aran e relevant student w vtrk update krgnna plwn wenne.

    let userId=req.params.id;                       //var ekk hadagnnw user id eka daganna. me code eken kiyanne url eken params(parameter) ekak vidiyata id ekak enawa. eka fetch karagannakiyala.
    const {name,age,gender}= req.body;              //this methods call as D-STRUCTURE. curly braces athule thyenne frontend eken ena request eke body eka athulethiyena data wala keys. ewata aluth values dana eka thama update ekedi ewnne.14-16 lines 3kin krpu ekama thama me single line eken kare.
    
    const updateStudents={                          //update karanna ona data tika dala object ekak hadagnnwa.ethakot lesi.
        name,
        age,
        gender
    }
    const update= await studentvar.findByIdAndUpdate(userId,updateStudents).then(()=>{      //first parameter eka thama user ge id eka, dewaniyata denne update karanna ona values tika. updatestudents kiyana object ek pass karanwa methanata.
         
    res.status(200).send({status:"user updated!",})                                 //404 error wage. 200 kiyanne success kiyana eka. successfully data update unot front end ekata status ekk ywnwa updated kiyala update una data tikath ekka..
}).catch((err)=> {                                                                       // ehem nathnm error eka pennanwa

    console.log(err);
})
})







//***...Delete...***


//http://localhost:8080/student/delete/id7812blabla45

router.route("/delete/:id").delete(async(req,res)=>{            //mee async, await kiyana code deken wenne system eka ekama welawe request dekak hoo wedi gnak awoth, delete krnn, update krnn monaama hari weda ekama welawe ekakata wada wedi ganak awoth app eka crash novi thiyaganna use krn ekak. eken denata process wena request eka process wenn dila anith ewa waiting eke thiyagannwa. ekak iwara unama anitha eka..app eka crash novi thygnnw. mkd meka web application ekak. eka welawe users la godkin or, eka user knkgen unath req godak enna plwn.

   let userId2= req.params.id;                                 //adala user id eka URL eken galawala gannwa
    
   await studentvar.findByIdAndDelete(userId2).then(()=>{               //kalin update, read wala wage name,age, gender data aran balanna one na, delete karanna nisa userID eka thibbm athi.

    res.status(200).send({status:"User deleted"});               //KALIN WAGE CONSOLE LOG EKAK DENNAT PLWN. METHANDI API FRONTEND EKATA RESPONSE EKAK YAWANWA user hariyata delete una nm.. thawa deyak meke mee status kiyanne keyword ekak neme, ekata apita kemathi deyak denna plwn, message/display... any

   }).catch((err)=>{

     console,log(err.message);                                                     //error message eka vtrk yawannt plwn
     res.status(500).send({status:"error with delete user", error: err.message})   // nathnm mhm frontEnd ekata response ekk yawannt plwn error code ekai error message ekai ekka.
   })

})

//***...Get unique individual user / read ...***
router.route("/get/:id").get(async(req,res)=>{           

    let userId= req.params.id;                                 
     const user=await studentvar.findById(userId)
    .then((student123)=>{               
 
     res.status(200).send({status:"User fetched",student123});              
    }).catch((err)=>{
 
      console,log(err.message);                                                     
      res.status(500).send({status:"error with delete user", error: err.message})  
    })
 
 })


module.exports=router;

