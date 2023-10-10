const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: {type: Number, default: 1, required: true},
    paymentInfo: {
        cardCode: {type: Number, required: true},
        cardExp: {type: Date, required: true},
        cardCompany: {type: String, required: true},
        cardNumber: {type: Number, required: true}
    },
    shippingInfo: {
        deliveryOption: {type: String, required: true},
        estimatedArrival: {type: Date, required: true},
        shippingCost: {type: Number, required: true},
        shippingDate: {type: Date, required: true},
    },
    total: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

orderSchema.pre('find', function(next) {
    this.populate('user', '-password -wishList');

    next();
});

module.exports = mongoose.model('Order', orderSchema);