const mongoose= require("mongoose")


const ExperiencesSchema = new mongoose. Schema({
    
    company: {
    type: String,
    required: true 

    },
    
    endDate: {
     type: Date,
     required: true,
         },

         poste: {
            type: String,
            required: true,
                },

                CondidateId: {
                    type: mongoose.Schema.Types.ObjectId,ref:'condidates',
                    required: true,
                        },
        
 
         startDate:  {
               type: Date,
                 required: true,
                                              },


    

    
})

module.exports = mongoose.model("Experience",ExperiencesSchema);