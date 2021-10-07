const express = require('express');
const Controllers = require('../controllers/Controllers');

const router = express.Router();

router.route('/').get(Controllers.getAllTz).post(Controllers.createNewTz);

router.route('/:id').put(Controllers.updateTzRouteById).delete(Controllers.deleteTzRouteById);

module.exports = router;