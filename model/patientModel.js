const mongoose = require('mongoose')

const patientModel1 = mongoose.Schema({
    ID:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    Othernames:{
        type:String,
    },
    Gender:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    ResidentialAddress:{
        type:String,
        required:true
    },
    EmergencyContactName:{
        type:String,
        required:true
    },
    RelationshipwithEM:{
        type:String,
        required:true
    },
    Appointments:{
        type:Array,
    },
    Vitals:{
        type:Array
    }
})



const Patient = mongoose.model("patient1",patientModel1);

module.exports = Patient;