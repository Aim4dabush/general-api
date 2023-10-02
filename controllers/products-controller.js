// models
const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
    const itemsPerPage = 10;
    let products;
    try{
        const totalProducts = await Product.countDocuments();
        
        if(!totalProducts){
            return;
        }

        products = await Product.find({})
            .select('-images -discountPercentage')
            .skip((req.page - 1 ) * itemsPerPage)
            .limit(itemsPerPage)

        if(!products){
            return;
        }
        
        res.status(200).send({
            products,
            pages: Math.ceil(totalProducts / itemsPerPage),
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
        
        if(!product){
            return;
        }
        
        res
            .status(200)
            .send({
                product,
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