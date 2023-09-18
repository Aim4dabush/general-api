const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res, next) => {
    try{
        const products = await Product.find({})
            .select('-images -discountPercentage');

        res.status(200).send({
            data: products,
            message: 'Products fetch successful',
        });
    } catch(err) {
        res.status(400).send({
            data: null,
            message: err.message
        });
    }
};

// GET a single product by _id 
exports.getProductById = async (req, res, next) => {
    const productId = req.params.productId;

    try{
        const product = await Product.findById(productId)
            .select('-discountPercentage');
        
        res
            .status(200)
            .send({
                data: product,
                message: 'Product fetch successful'
            });
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};