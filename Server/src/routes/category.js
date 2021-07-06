const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();

const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../uploads/')
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});
const upload = multer({ storage });

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.post('/category/update', requireSignin, adminMiddleware, upload.single('categoryImage'), updateCategories);
router.post('/category/delete', requireSignin, adminMiddleware, deleteCategories);
router.get('/category/getCategories', getCategories);

module.exports = router;