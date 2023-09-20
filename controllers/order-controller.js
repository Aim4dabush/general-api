// models
const { ObjectId } = require('mongodb');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try{
        const order = new Order({
            items: req.body.items,
            paymentInfo: req.body.paymentInfo,
            shippingInfo: req.body.shippingInfo,
            total: req.body.total,
            user: req.body.user
        });

        await order.save();

        res
            .status(200)
            .send({
                data: order,
                message: 'Order created'
            })
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }
};

exports.deleteOrder = async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.orderId);

        res
            .status(200)
            .send({
                data: order,
                message: `${req.params.orderId} has been deleted`
            });
    } catch(err) {
        res
            .status(200)
            .send({
                data: null,
                message: err.message
            });
    }
};

exports.getOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.params.userId});

        res
            .status(200)
            .send({
                data: orders,
                message: 'fetch successful'
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