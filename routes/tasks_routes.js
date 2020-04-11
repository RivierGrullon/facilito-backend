const express = require('express');

let tasksController = require('../controllers/tasks');
const router = express.Router();

router.route('/tasks').get(tasksController.index).post(tasksController.create);

router.get('/tasks/new', tasksController.new);

router.route('/tasks/:id')
        .get(tasksController.show)
        .put(tasksController.update)
        .delete(tasksController.destroy);

router.get('/tasks/:id/edit',tasksController.edit);

module.exports = router;