const express = require('express');
const router = express.Router();

const { quotePost , quoteGet, quoteEdit , quoteDelete} = require('../controllers/quoteController');

router.post('/post', quotePost);
router.get('/get', quoteGet);
router.put('/edit/:id', quoteEdit);
router.delete('/delete/:email', quoteDelete);

module.exports = router;