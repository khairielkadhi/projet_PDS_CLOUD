
const {Router}=require("express");

const {getTasks, updateTasks, deleteTasks,saveSignUp, saveTasks}=require ("../contollers/Task_controllers");

const router = Router();

router.get("/get", getTasks);
router.post("/save",saveTasks);
router.put("/update/:id",updateTasks);
router.delete("/delete",deleteTasks);

module.exports=router;
