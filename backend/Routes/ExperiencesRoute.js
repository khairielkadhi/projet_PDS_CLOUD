const {Router}=require("express");

const {AddExperience,updateExperiences}=require ("../contollers/ExperiencesController");

const router = Router();

router.post("/add",AddExperience);
router.put("/updatexperience",updateExperiences);


module.exports=router;