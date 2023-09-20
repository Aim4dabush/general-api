// 3rd party packages
const bcrypt = require('bcryptjs');

// models
const User = require('../models/user');

// POST a new user
exports.createNewUser = async (req, res) => {
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword,
        });

        await user.save();

        res
            .status(200)
            .send({
                data: user,
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
};

// GET user shopping cart
exports.getUserShoppingCart = async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user});
        
        res
            .status(200)
            .send({
                data: user.shoppingCart,
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
                data: user,
                message: `User ${user.firstName} ${user.lastName} profile successful`
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
        const user = await User.findOne({_id: req.user});
        
        res
            .status(200)
            .send({
                data: user.wishList,
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

//POST add, delete, and update product from shopping cart
exports.manageShoppingCartProduct = async (req, res) => {
    const action = req.body.action;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    
    try{
        const user = await User.findById(req.user);
        const cart = [...user.shoppingCart];
        const index = cart.findIndex(item => {
            return item.product._id.toString() === productId;
        });

        if(action === 'add' && index < 0){
            user.shoppingCart.push({
                product: productId,
                quantity
            });

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} added to shopping cart`
                })
        } else {
            user.shoppingCart[index].quantity += quantity;

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} updated in shopping cart`
                });
        }

        if(action === 'delete'){
            const wishList = cart.filter(item => {
                return item.product._id.toString() !== productId;
            })

            user.wishList = wishList;

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} deleted from shopping cart`
                });
        }

        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }
};

// POST add, delete, and update product from wish list
exports.manageWishListProduct = async (req, res) => {
    const action = req.body.action;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    
    try{
        const user = await User.findById(req.user);
        const cart = [...user.wishList];
        const index = cart.findIndex(item => {
            return item.product._id.toString() === productId;
        });

        if(action === 'add' && index < 0){
            user.wishList.push({
                product: productId,
                quantity
            });

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} added to wish list`
                })
        } else {
            user.wishList[index].quantity = quantity;

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} updated in wish list`
                });
        }

        if(action === 'delete'){
            const wishList = cart.filter(item => {
                return item.product._id.toString() !== productId;
            })

            user.wishList = wishList;

            res
                .status(200)
                .send({
                    data: user,
                    message: `Product ${productId} deleted from wish list`
                });
        }

        await user.save();
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: err.message
            })
    }
};

// PATCH update user profile
exports.updateUserProfile = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.user, req.body, {new: true});

        await user.save();

        res
            .status(200)
            .send({
                data: user,
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
};