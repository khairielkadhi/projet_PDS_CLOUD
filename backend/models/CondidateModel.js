const mongoose = require("mongoose");
const User = require('../models/SingUpModel');

         const condidateSchema = new mongoose.Schema({
           
            dateOfBirth: {
                 type: Date,
                 required: true,
             },
             
             userId:  {
                type: mongoose.Schema.Types.ObjectId,ref:'users',
                  required: true,
                                               },
             sex: {
                type: String,
                required: true,
            },

            address: {
                required: true,
                type: String
            }
            ,
            sessionId:  {
                type: mongoose.Schema.Types.ObjectId,ref:'joboffers',
                 required: true,
                                              },
                                              statut:  {
                                                type: String
                                                 
                                                                              }



         });
         
         module.exports = mongoose.model("Condidate", condidateSchema);