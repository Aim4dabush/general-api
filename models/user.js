const {Schema, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    birthday: {type: Date, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    shoppingCart: [
        {
            _id: false,
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    username: {type: String, required: true},
    wishList: [
        {
            _id: false,
            product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ]
});

module.exports = mongoose.model('User', userSchema);