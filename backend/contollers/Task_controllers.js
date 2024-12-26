 

const TaskModel=require("../models/TaskModel")

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find() 
   res.send(tasks)
};



module.exports.saveTasks = (req, res) => {

    
    TaskModel.create(req.body)
    .then((data)=> {
   console.log("savec Successfully...");
   res.status(201).send(data)

    }).catch((err)=>{
        console.log(err); 
        console.log("khairi.")
        
        res.send({error: err, msg:"somthing went wrong !"});
    })
};
    
    
module.exports.updateTasks = (req, res) => {
     

    const {id}=req.params
    const {task} = req.body
     
    TaskModel.findByIdAndUpdate(id,{task})
    .then(()=>res.send("updated Successfully ")) 
   
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg:"somthing went wrong !"});
    });
};
    


module.exports.deleteTasks = (req, res) => {
     

    const {id}=req.params
    
     
    TaskModel.findByIdAndDelete(id)
    .then(()=>res.send("deleted Successfully ")) 
   
    .catch((err)=>{
        console.log(err);
        res.send({error: err, msg:"somthing went wrong !"});
    });
};