const Product = require('../models/Products');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorPesponse');
const {param} = require("express/lib/router");

exports.getAllProducts = asyncHandler(async (req,res,next) => {

    let query;

    const reqQuery = {...req.query};

    const removeFields = ['sort'];

    removeFields.forEach(val => delete reqQuery[val]);


    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `${match}`);

    const products = await Product.find( JSON.parse(queryStr));


    res.status(200).json({
        success: true,
        data: products
    });
});

exports.createNewProduct= asyncHandler(async (req,res,next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        data:product,
    });
});

exports.updateProductRouteById = asyncHandler(async  (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
    return next(new ErrorResponse(`Product with id ${req.params.id} was not found`,404))}

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true})

    res.status(201).json({
        success:true,
        data:product,
    });
});

exports.deleteProductRouteById = asyncHandler(async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Product with id ${req.params.id} was not found`, 404))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

