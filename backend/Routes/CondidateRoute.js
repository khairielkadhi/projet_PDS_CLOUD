const {Router}=require("express");

const {AddCondidate,getCondidateByIDUser,updateCondidate,getCondidateByIDSession,getCondidateByIDUserForsession}=require ("../contollers/CondidateController");
const {getUsersWithCandidates,getUsersWithCandidatesByIdUser,}=require("../contollers/ListOfCandidateContoller");

const router = Router();

router.get("/get/:id?", getCondidateByIDUser);
router.post("/add",AddCondidate);
router.get("/",getUsersWithCandidates);
router.get("/:userId",getUsersWithCandidatesByIdUser);
router.put("/updatecondidate/:id?",updateCondidate);
router.get("/session/:id?",getCondidateByIDSession);
router.get("/get/getsession/:userId?",getCondidateByIDUserForsession);

module.exports=router;