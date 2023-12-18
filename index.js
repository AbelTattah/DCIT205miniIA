const express = require('express')
const app =express()
const mongoose = require('mongoose');
const Patient = require('./models/patientModel');

/*
TODO: Make sure a patient is not registered twice


Requirements:
Register patients who do not already exist
Start an encounter with patient
Submit patient vitals
View a list of patients
View the details of a specific patient



*/ 

//middleware
app.use(express.json())

//MongoDB Connection
mongoose.connect('mongodb+srv://tattahabelk:Abel1919@cluster0.bkxk0nq.mongodb.net/',{
})
.then(()=>{
    console.log('Connected to MongoDB')}
).catch((error)=>console.log(error.message));



//routes


//Create new patient record
app.post("/patient",async(req,res)=>{
    const check = await Patient.find({FirstName:req.body.FirstName,Surname:req.body.Surname},{FirstName:true});
  
        if (check.length==0) {
            const patient = await Patient.create(req.body);
            res.status(200).json(patient);
           }    
           else {
            res.status(404).json({message:"Patient Already exists"}); 
            console.log(check);
           }

})




app.listen(3000,()=>{
    console.log('Node server is running')
});
