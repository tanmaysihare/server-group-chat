const express = require('express');
const router = express.Router();
const {validateToken} = require("../middleware/token");
const addUsersController = require("../controllers/AddUsers");

router.post("/addUsers/:id", validateToken, addUsersController.addUsers);

router.post("/searchUsers", validateToken, addUsersController.searchUsers);

module.exports = router;