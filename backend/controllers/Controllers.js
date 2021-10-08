const Product = require('../models/Products');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorPesponse');


exports.getAllProducts = asyncHandler(async (req,res,next) => {

    let query;

    let values = {
        filtering: {},
        sorting: {},
    };

    const reqQuery = {...req.query};

    const removeFields = ['sort'];

    removeFields.forEach(val => delete reqQuery[val]);

    const filterKeys = Object.keys(reqQuery);
    const filterValues = Object.values(reqQuery);

    filterKeys.forEach((val,index) => values.filtering[val] = filterValues[index]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

    query = Product.find(JSON.parse(queryStr));

    if(req.query.sort) {
        const sortByArr = req.query.sort.split(',')

        sortByArr.forEach(val => {
            let order;
            if(val[0] === '-'){
                order='descending'
            } else {
                order = 'ascending';
            }

            values.sorting[val.replace('-','')] = order;
        })

        const sortByStr = sortByArr.join(' ');

        query = query.sort(sortByStr);
    } else {
        query = query.sort('-price');
    }

    const products = await  query;

    const maxPrice = await Product.find().sort({ price: -1}).limit(1).select('-id price');

    const minPrice = await Product.find().sort({price:1}).limit(1).select('-_id price');

    values.maxPrice = maxPrice[0].price;
    values.minPrice = minPrice[0].price;

    res.status(200).json({
        success: true,
        data: products,
        values,
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

