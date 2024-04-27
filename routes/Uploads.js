const multer = require('multer');
const express = require('express');
const {validateToken} = require('../middleware/token');
const router = express.Router();
const uploadsController = require('../controllers/Uploads');
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/:id', upload.single('file'), validateToken, uploadsController.uploadFile);

module.exports = router;