const {Schema, default: mongoose} = require('mongoose');

const productSchema = new Schema({
    brand: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    images: [
        {type: String, required: true}
    ],
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    stock: {type: Number, required: true},
    thumbnail: {type: String, required: true},
    title: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);