const Product = require('../models/Products');

exports.getAllProducts = async (req,res,next) => {
    const products = await Product.find();

    res.status(200).json({
        sucess:true,
        data:products
    })
};

exports.createNewProduct= (req,res,next) => {
    res.send('create new product route');
};

exports.updateProductRouteById = (req,res,next) => {
    res.send('update product route');
};

exports.deleteProductRouteById = (req,res,next) => {
    res.send('delete product route');
};

