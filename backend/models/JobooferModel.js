
const mongoose= require("mongoose")


const JobofferSchema = new mongoose. Schema({
    years: {
    type: String,
    required: true 

    },
    
    description: {
     type: String,
     required: true,
         },
 
       

    
})

module.exports = mongoose.model("joboffer",JobofferSchema);