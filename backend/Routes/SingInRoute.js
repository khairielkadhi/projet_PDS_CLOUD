
const { Router } = require("express");
const { getUser, getUserByID } = require("../contollers/SignInController");

const router = Router();

router.post("/user", getUser);
router.get("/user/:userId", getUserByID);

module.exports = router;