const Product = require('../models/Products');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorPesponse');


exports.getAllProducts = asyncHandler(async (req,res,next) => {

    let query;

    const reqQuery = {...req.query};

    const removeFields = ['sort'];

    removeFields.forEach(val => delete reqQuery[val]);


    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    query = Product.find(JSON.parse(queryStr));

    if(req.query.sort) {
        const sortByArr = req.query.sort.split(',')

        const sortByStr = sortByArr.join(' ');

        query = query.sort(sortByStr);
    } else {
        query = query.sort('-price');
    }

    const products = await  query;

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
    return next(new ErrorResponse(`Product with id ${req.params.id} was not found`,404));
    }

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

