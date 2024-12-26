const mongoose= require("mongoose")


const LanguagesSchema = new mongoose. Schema({
    
    language: {
    type: String,
    required: true 

    },
    
    level: {
     type: String,
     required: true,
         },
 
         CondidateId:  {
          type: mongoose.Schema.Types.ObjectId,ref:'condidates',
                 required: true,
                                              },


    

    
})

module.exports = mongoose.model("Language",LanguagesSchema);