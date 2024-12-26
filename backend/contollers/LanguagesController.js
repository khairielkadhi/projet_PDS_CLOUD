const LanguagesModel=require("../models/LanguagesModel")





module.exports.AddLanguage = (req, res) => {

    console.log(req.body)
    LanguagesModel.create(req.body)
    .then((data)=> {
   console.log("Add New Language Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};




module.exports.updateLanguage = (req, res) => {
    const languagesToUpdate = req.body;
    console.log("languagesToUpdate:", languagesToUpdate);

    if (!Array.isArray(languagesToUpdate)) {
        console.log("Invalid data format");
        return res.status(400).send({ error: "Invalid data format. Expecting an array of languages." });
    }

    // Assuming each language object has a unique _id
    const promises = languagesToUpdate.map((language) => {
        const id = language._id;
        console.log(id);

        // Exclude the _id field from the update
        const updatedLanguage = { ...language };
        delete updatedLanguage._id;

        return LanguagesModel.findByIdAndUpdate(id, updatedLanguage, { new: true });
    });

    Promise.all(promises)
        .then((updatedLanguages) => {
            res.status(200).send(updatedLanguages);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ error: err, msg: "Something went wrong while updating languages!" });
        });
};
