
         const mongoose = require("mongoose");

         const userSchema = new mongoose.Schema({
             firstName: {
                 type: String,
                 required: true
                 
             },
             lastName: {
                 type: String,
                 required: true
             }, 
             email: {
                 type: String,
                 required: true
             },
             

    
        password: {
        type: String,
        
            },
            role: {
                type: String,
                
                    },
    
             diploma: {
                 type: String,
                 
             },
             receiveEmails: {
                 type: Boolean,
                 
             },
             additionalInfo: {
                 type: String
             },
             city: {
                 type: String
             },
             country: {
                 type: String
             },
             cv: {
                type: Buffer, // Utilisez le type Buffer pour stocker le contenu du CV
            },
             cvName: {
                 type: String
             },
             dateOfBirth: {
                 type: Date
             },
             phoneNumber: {
                 type: String
             },
             yearOfExperience: {
                 type: String
             },

             
             sex: {
                type: String
            }
         });
         
         module.exports = mongoose.model("User", userSchema);