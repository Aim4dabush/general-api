// models
const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
    const itemsPerPage = 10;
    let products;
    try{
        products = await Product.find({})
            .select('-images -discountPercentage')
            .skip((req.page - 1 ) * itemsPerPage)
            .limit(itemsPerPage)

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
exports.getProductById = async (req, res) => {
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