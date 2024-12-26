const DiplomaModel=require("../models/DiplomaModel")





module.exports.AddDiploma = (req, res) => {

    console.log(req.body)
    DiplomaModel.create(req.body)
    .then((data)=> {
   console.log("Add New Diploma Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};













module.exports.getDiplomaByIDUser = async (req, res) => {
    try {
       
        const IDuser = req.params.id;
        const Diploma = await UserModel.findOne({CondidateId:IDuser});
        
        if (!Diploma) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par e-mail :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de l'utilisateur." });
    }
};




module.exports.updateDiplomas = (req, res) => {
    const diplomasToUpdate = req.body;
    console.log("diplomasToUpdate:", diplomasToUpdate);
    if (!Array.isArray(diplomasToUpdate)) {
        console.log("Invalid data format");
        return res.status(400).send({ error: "Invalid data format. Expecting an array of diplomas." });
    }

    // Assuming each diploma object has a unique _id
    const promises = diplomasToUpdate.map((diploma) => {
        const id = diploma._id;
        console.log(id);
        
        // Exclude the _id field from the update
        const updatedDiploma = { ...diploma };
        delete updatedDiploma._id;
        
        return DiplomaModel.findByIdAndUpdate(id, updatedDiploma, { new: true });
    });

    Promise.all(promises)
        .then((updatedDiplomas) => {
            res.status(200).send(updatedDiplomas);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ error: err, msg: "Something went wrong while updating diplomas!" });
        });
};
