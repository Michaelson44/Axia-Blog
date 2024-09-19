const express = require('express');
const { register, login} = require('../controller/auth');
const router = express.Router();

router.post('/user', register);
router.post('/login', login);

module.exports = router;