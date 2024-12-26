 

const UserModel=require("../models/SingUpModel")

module.exports.getUser = async (req, res) => {
    const tasks = await UserModel.find(req.body.email) 
   res.send(tasks)
};




module.exports.SingIn = (req, res) => {

    
    UserModel.create(req.body)
    .then((data)=> {
   console.log("saved New User Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};





module.exports.saveUser = (req, res) => {

    console.log(req.body)
    UserModel.create(req.body)
    .then((data)=> {
   console.log("saved New User Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};
    
    
module.exports.updateUser = (req, res) => {
    const id = req.params.id; // Extract the actual ID value
    const data = req.body;

    console.log(id);
    console.log(data);

    // Convert the CV content from Base64 to a Buffer
   
    
    UserModel.findByIdAndUpdate(id, data)
        .then(() => {
            console.log("merci");
            res.send("Updated User Successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err, msg: "Something went wrong!" });
        });
};


    
// Assurez-vous d'utiliser les bibliothèques nécessaires pour gérer les fichiers et les téléchargements


const fs = require('fs');

module.exports.updateCV = async (req, res) => {
    console.log("hello")
  const id = req.params.id;

  if (!req.files || !req.files.cv) {
    return res.status(400).send({ msg: 'Aucun fichier CV n\'a été téléchargé.' });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).send({ msg: 'Utilisateur non trouvé.' });
    }

    const cvFile = req.files.cv; // Get the uploaded file
    const cvData = fs.readFileSync(cvFile.tempFilePath); // Read the file content

    // Convert the file content to base64
    const cvBase64 = cvData.toString('base64');

    // Update the user's CV field with the base64 data
    user.cv = cvBase64;

    // Save the user object to the database
    await user.save();

    console.log('CV mis à jour avec succès');
    res.send('CV mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du CV:', error);
    res.status(500).send({ error: error, msg: 'Quelque chose s\'est mal passé.' });
  }
};

  






module.exports.deleteUser = (req, res) => {
  const { id } = req.params;

  console.log("ID à supprimer :", id); // Ajoutez ce log pour vérifier l'ID extrait

  UserModel.findByIdAndDelete(id)
      .then(() => {
          console.log("Utilisateur supprimé avec succès");
          res.send("Utilisateur supprimé avec succès");
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send({ error: err, msg: "Quelque chose s'est mal passé !" });
      });
};

/*UserModel.findByIdAndUpdate(id, data)
.then(() => {
    console.log("merci");
    res.send("Updated User Successfully");
})
.catch((err) => {
    console.log(err);
    res.status(500).send({ error: err, msg: "Something went wrong!" });
});
};
*/


module.exports.getManagers = async (req, res) => {
    try {
      const managers = await UserModel.find({ role: 'manager' });
      res.send(managers);
    } catch (error) {
      res.status(500).send("Une erreur s'est produite lors de la récupération des managers.");
    }
  };