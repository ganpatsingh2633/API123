const express = require('express');
const router = express.Router();

const { productPost , productGet, productEdit, productDelete } = require('../controllers/productcontroller');

router.post('/post', productPost);
router.get('/get', productGet);
router.put('/edit/:id', productEdit);
router.delete('/delete/:id', productDelete);

module.exports = router;