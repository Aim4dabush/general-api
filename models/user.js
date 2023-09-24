const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    address: {
        city: String,
        state: String,
        street: String,
        zipCode: Number
    },
    birthday: Date,
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: String,
    shoppingCart: [
        {
            _id: false,
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    wishList: [
        {
            _id: false,
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('User', userSchema);