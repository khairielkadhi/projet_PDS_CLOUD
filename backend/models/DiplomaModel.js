const mongoose= require("mongoose")


const DiplomaSchema = new mongoose. Schema({
    diplomaTitle: {
    type: String,
    required: true 

    },
    
    institution: {
     type: String,
     required: true,
         },
 
         startDateDiploma: {
            type: Date,
            required: true,
                },

                endDateDiploma: {
      type: Date,
       required: true,
                        },

            CondidateId:  {
                type: mongoose.Schema.Types.ObjectId,ref:'condidates',
                 required: true,
                                              }
,
            moyenneSemestre1
            : {
                required: true,
                type: String}
                ,
            moyenneSemestre2
            : {
                required: true,
                type: String}
                ,
            moyenneSemestre3
            : {
                required: true,
                type: String}

                ,
                notePFE
            : {
                required: true,
                type: String}
     


          

    
})

module.exports = mongoose.model("Diploma",DiplomaSchema);