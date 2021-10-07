const Product = require('../models/Products');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllProducts = asyncHandler(async (req,res,next) => {
    const products = await Product.find();

    res.status(200).json({
        success:true,
        data:products
    })
});

exports.createNewProduct= asyncHandler(async (req,res,next) => {
    res.send('create new product route');
});

exports.updateProductRouteById = asyncHandler(async  (req,res,next) => {
    res.send('update product route');
});

exports.deleteProductRouteById = asyncHandler(async (req,res,next) => {
    res.send('delete product route');
});

