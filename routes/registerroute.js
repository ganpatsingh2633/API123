const express = require('express');
const router = express.Router();

const { registerUser , registerGet, registerEdit, registerDelete , getuserbyemail} = require('../controllers/registerController');

router.post('/post', registerUser);
router.get('/get', registerGet);
router.put('/edit/:id', registerEdit);
router.delete('/delete/:id', registerDelete);
router.get('/get/:email', getuserbyemail);
module.exports = router;