const express = require('express');
const router = express.Router();
const messagesController = require("../controllers/Messages");
const {validateToken} = require("../middleware/token");

router.get("/getMessages", validateToken, messagesController.getMessages);

router.post("/sendMessage", validateToken, messagesController.postMessage);

module.exports = router;