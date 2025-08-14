const express = require('express');
const router = express.Router();

const { teamPost , teamGet, teamEdit, teamDelete } = require('../controllers/stoneTeamController');

router.post('/post', teamPost);
router.get('/get', teamGet);
router.put('/edit/:id', teamEdit);
router.delete('/delete/:id', teamDelete );

module.exports = router;