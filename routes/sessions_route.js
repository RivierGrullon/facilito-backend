const express = require('express');
const router = express.Router();
let SessionsController = require('../controllers/sessions')

router.route('/sessions').get(SessionsController.new).post(SessionsController.create).delete(SessionsController.destroy);

module.exports = router;