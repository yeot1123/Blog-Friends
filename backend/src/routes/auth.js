const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload_photo = require('../../middleware/profile_photo');



router.post('/login', authController.login);
router.post('/register', upload_photo.single('image'), authController.register);




module.exports = router;
