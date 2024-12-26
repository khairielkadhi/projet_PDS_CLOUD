
const {Router}=require("express");

const {getUser, saveUser, updateUser, deleteUser, updateCV,getManagers}=require ("../contollers/SingUp_Controllers");

const router = Router();

router.get("/get", getUser);
router.post("/save",saveUser);
router.put("/update/:id",updateUser);
router.put("/updateCV/:id",updateCV);
router.delete("/delete/:id",deleteUser);
router.get("/Managers",getManagers);

module.exports=router;
