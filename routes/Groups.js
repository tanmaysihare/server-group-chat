const express = require('express');
const router = express.Router();
const groupController = require("../controllers/Groups");
const {validateToken} = require("../middleware/token");

router.post("/createGroup", validateToken, groupController.createGroup);

router.get("/getGroups", validateToken, groupController.getGroups);

module.exports = router;