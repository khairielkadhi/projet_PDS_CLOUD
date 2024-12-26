const {Router}=require("express");

const {AddLanguage,updateLanguage}=require ("../contollers/LanguagesController");

const router = Router();

router.post("/add",AddLanguage);
router.put("/updateLanguage",updateLanguage);

module.exports=router;