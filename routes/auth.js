const express = require('express');
const { register, login, testjwt } = require('../controller/auth');
const router = express.Router();

router.post('/user', register);
router.post('/login', login);
router.put('/jwt', testjwt);

module.exports = router;