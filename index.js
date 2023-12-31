const express = require('express')
const app =express()
const mongoose = require('mongoose');
const Patient = require('./model/patientModel');

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

//Start encounter with patient
//Assuming that the frontend will provide all patient names in the request body

app.put("/patient",async(req,res)=>{
    try {
        const update = await Patient.findOneAndUpdate({FirstName:req.body.FirstName,Surname:req.body.Surname},{Appointments:req.body.Appointments});
        res.status(200).json(update)
    } catch (error) {
        console.log(error.message);
    }
})

//Record patient vitals
//Assuming that the frontend will provide all patient names in the request body

app.put("/patientv",async(req,res)=>{
    try {
        const update = await Patient.findOneAndUpdate({FirstName:req.body.FirstName,Surname:req.body.Surname},{Vitals:req.body.Vitals});
        res.status(200).json(update);
    } catch (error) {
        console.log(error.message);
    }
})


//View list of patients
app.get("/patientall",async(req,res)=>{
    try {
        const patient = await Patient.find({},{FirstName:true,Surname:true});
        console.log(patient);
        res.status(200).json(patient);
    } catch (error) {
        console.log(error.message);
    }
})


//Get details of a particular patient
app.get("/patient/:name/:name2",async(req,res)=>{
    try {      
        const update = await Patient.find({FirstName:req.params.name,Surname:req.params.name2},{Vitals:true,Appointments:true});
        console.log(req.params.name);
        res.status(200).json(update);
    } catch (error) {
        console.log(error.message);
    }
})



app.listen(4000,()=>{
    console.log('Node server is running')
});
