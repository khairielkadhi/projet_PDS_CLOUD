const {Router}=require("express");

const {getJoboffer, getJobofferByID,CreateSession}=require ("../contollers/JobooferControllers");

const router = Router();

router.get("/get", getJoboffer);
router.get("/get/:id?", getJobofferByID);
router.post("/save",CreateSession);

module.exports=router;
