const express = require('express');
const Controllers = require('../controllers/Controllers');

const router = express.Router();

router
    .route('/')
    .get(Controllers.getAllProducts)
    .post(Controllers.createNewProduct);

router
    .route('/:id')
    .put(Controllers.updateProductRouteById)
    .delete(Controllers.deleteProductRouteById);

module.exports = router;