const express = require('express');
const router = express.Router();

const { orderProductpost , orderget, ordergetbyemail, orderEdit , orderDelete} = require('../controllers/orderController');

router.post('/post', orderProductpost);
router.get('/get', orderget);
router.get('/get/:email', ordergetbyemail);
router.put('/edit/:id', orderEdit);
router.delete('/delete/:id', orderDelete);

module.exports = router;