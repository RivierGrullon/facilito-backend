const express = require('express');
let router = express.Router();
let RegistrationController = require('../controllers/registration');

router.get('/signup', RegistrationController.new);
router.route('/users').post(RegistrationController.create);
module.exports = router;