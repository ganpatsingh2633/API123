const express = require('express');
const router = express.Router();

const {loginUser,loginGet, loginDelete} = require("../controllers/loginController");
router.post('/login',loginUser);
router.get('/login/get', loginGet);
router.delete('/login/delete/:email', loginDelete);
module.exports =  router;