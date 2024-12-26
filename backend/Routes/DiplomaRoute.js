const {Router}=require("express");

const {getDiplomaByIDUser,AddDiploma,updateDiplomas}=require ("../contollers/DiplomaController");

const router = Router();

router.get("/get/:id?", getDiplomaByIDUser);
router.post("/add",AddDiploma);
router.put("/updatediploma",updateDiplomas);



module.exports=router;