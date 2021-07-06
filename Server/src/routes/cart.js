const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controllers/cart');
const router = express.Router();

const {  } = require('../controllers/category');


router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
//router.get('/category/getCategories', getCategories);

module.exports = router;