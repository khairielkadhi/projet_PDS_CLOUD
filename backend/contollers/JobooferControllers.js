 

const jobofferModel = require("../models/JobooferModel");

module.exports.getJoboffer = async (req, res) => {
    try {
        const joboffers = await jobofferModel.find();
        res.status(200).json(joboffers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving job offers", error: error.message });
    }
};


module.exports.getJobofferByID = async (req, res) => {
    try {
        if (req.params.id) {
            const joboffer = await jobofferModel.findById(req.params.id);
            if (!joboffer) {
                return res.status(404).json({ message: "Job offer not found" });
            }
            return res.status(200).json(joboffer);
        } else {
            const joboffers = await jobofferModel.find();
            return res.status(200).json(joboffers);
        }
    } catch (error) {
        return res.status(600).json({ message: "Error retrieving job offers", error: error.message });
    }
};


module.exports.CreateSession = (req, res) => {

    console.log(req.body)
    jobofferModel.create(req.body)
    .then((data)=> {
   console.log("saved New Session Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        
        
        res.send({error: err, msg:"somthing went wrong joboffer !"});
    })
};
    






    



