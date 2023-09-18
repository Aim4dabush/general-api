const User = require('../models/user');

// POST a new user
exports.createNewUser = async (req, res) => {
    try{
        const user = new User({
            birthday: req.body.birthday,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            username: req.body.username
        });

        await user.save();

        res
            .status(200)
            .send({
                data: user,
                message: 'New user created'
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

// GET user profile by Id
exports.getUserProfile = async (req, res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);

        res
            .status(200)
            .send({
                data: user,
                message: 'User found'
            })
    } catch(err) {
        res
            .status(400)
            .send({
                data: null,
                message: 'User not found'
            })
    }
};