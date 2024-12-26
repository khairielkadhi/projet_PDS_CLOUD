const ExperiencesModel=require("../models/ExperiencesModel")





module.exports.AddExperience = (req, res) => {

    console.log(req.body)
    ExperiencesModel.create(req.body)
    .then((data)=> {
   console.log("Add New Experience Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};


// Dans votre fichier experiencesController.js


module.exports.updateExperiences = (req, res) => {
    const experiencesToUpdate = req.body;
    console.log("experiencesToUpdate:", experiencesToUpdate);
    if (!Array.isArray(experiencesToUpdate)) {
        console.log("khairi")
        return res.status(400).send({ error: "Invalid data format. Expecting an array of experiences." });
    }

    // Assuming each experience object has a unique _id
    const promises = experiencesToUpdate.map((experience) => {
        const id = experience._id;
        console.log(id)
        // Remove the _id field to avoid updating it
        delete experience._id;
        return ExperiencesModel.findByIdAndUpdate(id, experience, { new: true });
    });

    Promise.all(promises)
        .then((updatedExperiences) => {
            res.status(200).send(updatedExperiences);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ error: err, msg: "Something went wrong while updating experiences!" });
        });
};