const {Schema, default: mongoose} = require('mongoose');

const userSchema = new Schema({
    birthday: {type: Date, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);