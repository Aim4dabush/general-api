// 3rd party packages
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// routes
const authRoute = require('./routes/auth-route');
const productsRoute = require('./routes/products-route');
const userRoute = require('./routes/user-route');

// express app
const app = express();
dotenv.config();

// port
const PORT = process.env.PORT;

// parse incoming JSON data
app.use(bodyParser.json());

// set headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');

    next();
});

//authRoute
app.use(authRoute);

// products
app.use('/products', (req, res, next) => {
    req.page = +req.query.page || 1;
    next();
}, productsRoute);

// users
app.use('/user', (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    
    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            throw new Error('Auth Failed')
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decodedToken.id;
        next();
    } catch(err) {
        return next({data: null, message: err.message});
    }
}, userRoute);

// connect to mongodb with mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT);
        console.log(`Server listening on port ${PORT}`);
    })
    .catch((err) => {
        console.log(err.message);
    });