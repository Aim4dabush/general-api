// 3rd party packages
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();

// models
const Order = require('../models/order');
const User = require('../models/user');

//POST create new order
exports.createOrder = async (req, res) => {
    let order;

    try{
        order = new Order({
            items: req.body.items,
            paymentInfo: req.body.paymentInfo,
            shippingInfo: req.body.shippingInfo,
            total: req.body.total,
            user: req.user
        });

        res
            .status(200)
            .send({
                order,
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

    try{
        await order.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// POST a new user
exports.createNewUser = async (req, res) => {
    let user;

    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword,
            address: {
                city: req.body.city,
                state: req.body.state,
                street: req.body.street,
                zipCode: req.body.zipCode
            }
        });

        res
            .status(200)
            .send({
                user,
                message: `User ${user.firstName} ${user.lastName} created`
            })
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }

    try{
        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// DELETE delete order
exports.deleteOrder = async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.orderId);

        res
            .status(200)
            .send({
                order,
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

// GET user orders
exports.getOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user});

        res
            .status(200)
            .send({
                orders,
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

// GET user shopping cart
exports.getUserShoppingCart = async (req, res) => {
    try{
        const user = await User.findById(req.user).populate({
            path: 'shoppingCart.product',
            select: 'price thumbnail title'
        });
        
        res
            .status(200)
            .send({
                user: user.shoppingCart,
                message: 'fetch shopping cart successful'
            });
    } catch(err){
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// GET user profile by Id
exports.getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user);

        res
            .status(200)
            .send({
                user,
                message: `Fetch user ${user.firstName} ${user.lastName} successful`
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

// GET user wish list
exports.getUserWishList = async (req, res) => {
    try{
        const user = await User.findById(req.user)
                                    .populate({
                                        path: 'wishList.product',
                                        select: 'price thumbnail title'
                                    });
        
        res
            .status(200)
            .send({
                user: user.wishList,
                message: 'fetch wish list successful'
            });
    } catch(err){
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// POST login user
exports.loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let token;
    let user;

    try{
        user = await User.findOne({email: email});
       
    } catch(err){
        return res
                .status(500)
                .send({data: null, message: err.message})
    }
    
    try{
       const match = await bcrypt.compare(password, user.password);

       if(!match){
        throw new Error('Credentials do not match');
       }
    } catch(err) {
        return res
                .status(500)
                .send({data: null, message: err.message})
    }

    try{
        token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET, {expiresIn: '2h'});
    } catch(err) {
        return next({data: null, message: err.message});
    }

    res
        .status(201)
        .send({
            user,
            token,
            message: `${user.firstName} ${user.lastName} login successful`
        })
};

//POST add, delete, and update product from shopping cart
exports.manageShoppingCartProduct = async (req, res) => {
    const action = req.params.action;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    let user;
    
    try{
        user = await User.findOne({_id: req.user});
        const cart = [...user.shoppingCart];

        // if action is add and product doesn't exist then add a new product
        if(action === 'add'){
            // checks to see if product exists in cart
            const index = cart.findIndex(item => {
                return item.product._id.toString() === productId;
            });

            // if product exist then update the quantity
            if(index >= 0){
                user.shoppingCart[index].quantity = quantity;

                res
                    .status(200)
                    .send({
                        user: user.shoppingCart,
                        message: `Product ${productId} updated in shopping cart`
                    });
            // else add new product
            } else {
                user.shoppingCart.push({
                    product: productId,
                    quantity
                });
    
                res
                    .status(200)
                    .send({
                        user: user.shoppingCart,
                        message: `Product ${productId} added to shopping cart`
                    })
            }
        } 

        // if action is delete then remove product from cart
        if(action === 'delete'){
            const shoppingCart = cart.filter(item => {
                return item.product._id.toString() !== productId;
            })

            user.shoppingCart = shoppingCart;

            res
                .status(200)
                .send({
                    user: user.shoppingCart,
                    message: `Product ${productId} deleted from shopping cart`
                });
        }
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }

    try{
        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// POST add, delete, and update product from wish list
exports.manageWishListProduct = async (req, res) => {
    const action = req.params.action;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    let user;
    
    try{
        user = await User.findOne({_id: req.user});
        const cart = [...user.wishList];

        // if action is add then check if product exists
        if(action === 'add'){
             // checks to see if product exists in cart
            const index = cart.findIndex(item => {
                return item.product._id.toString() === productId;
            });

            // if product exist then update the quantity
            if(index >= 0){
                user.wishList[index].quantity = quantity;

                res
                    .status(200)
                    .send({
                        user: user.wishList,
                        message: `Product ${productId} updated in wish list`
                    });
            // else add new product
            } else {
                user.wishList.push({
                    product: productId,
                    quantity
                });
    
                res
                    .status(200)
                    .send({
                        user: user.wishList,
                        message: `Product ${productId} added to wish list`
                    })
            }
        }

        // if action is delete then remove product from cart
        if(action === 'delete'){
            const wishList = cart.filter(item => {
                return item.product._id.toString() !== productId;
            });

            user.wishList = wishList;

            res
                .status(200)
                .send({
                    user: user.wishList,
                    message: `Product ${productId} deleted from wish list`
                });
        }
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }

    try{
        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};

// PATCH update user profile
exports.updateUserProfile = async (req, res) => {
    let user;
    try{
        user = await User.findByIdAndUpdate(req.user, req.body, {new: true});
        res
            .status(200)
            .send({
                user,
                message: `User ${user.firstName} ${user.lastName} updated`
            });
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }

    try{
        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            });
    }
};