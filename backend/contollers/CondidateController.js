const CondidateModel=require("../models/CondidateModel")





module.exports.AddCondidate = (req, res) => {

    console.log(req.body)
    CondidateModel.create(req.body) 
    .then((data)=> {
   console.log("Add New Condidate Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};


module.exports.getCondidateByIDUser = async (req, res) => {
    try {
       
        const IDuser = req.params.id;
        const Condidate = await CondidateModel.findOne({IDuser});
        
        if (!Condidate) {
            return res.status(404).json({ message: "Condidate introuvable" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'Condidate par e-mail :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de Condidate." });
    }
};


module.exports.updateCondidate = (req, res) => {
    const id = req.params.id; // Extract the actual ID value
    const data = req.body;

    console.log("updateCondidate");
    console.log(data);

    // Convert the CV content from Base64 to a Buffer
   
    
    CondidateModel.findByIdAndUpdate(id, data)
        .then(() => {
            console.log("merci");
            res.send("Updated Condidate Successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err, msg: "Something went wrong!" });
        });
};


module.exports.getCondidateByIDSession = async (req, res) => {
    try {
        const IDsession = req.params.id;

        // Utilisez findOne avec une condition sur le champ IDsession
        const condidate = await CondidateModel.findOne({ sessionId: IDsession });
        
        if (!condidate) {
            return res.status(404).json({ message: "Ce candidat n'est pas inscrit dans cette session" });
        }

        // Vous avez utilisé une variable 'sessionofcandidate' qui n'est pas définie, je l'ai remplacée par 'condidate'
        return res.status(200).json(condidate);
    } catch (error) {
        console.error("Erreur lors de la récupération du candidat par ID de session :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du candidat." });
    }
};


module.exports.getCondidateByIDUserForsession = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(userId);
        const Condidate = await CondidateModel.findOne({ userId });
        
        if (!Condidate) {
            return res.status(404).json({ message: "Condidate introuvable" });
        }

        return res.status(200).json(Condidate); // Remplacez "user" par "Condidate"
    } catch (error) {
        console.error("Erreur lors de la récupération de l'Condidate par e-mail :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de Condidate." });
    }
};

