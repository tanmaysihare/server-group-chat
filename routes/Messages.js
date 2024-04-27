const express = require('express');
const router = express.Router();
const messagesController = require("../controllers/Messages");
const {validateToken} = require("../middleware/token");

router.get("/getMessages/:id", validateToken, messagesController.getMessages);

router.post("/sendMessage/:id", validateToken, messagesController.postMessage);

module.exports = router;