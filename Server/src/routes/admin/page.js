const express = require('express');
const { createPage, updatePage, getPage } = require('../../controllers/admin/page');
const { upload, requireSignin, adminMiddleware } = require('../../common-middleware');
const router = express.Router();

router.post('/page/create',  requireSignin, adminMiddleware, upload.fields([
    {name: 'banners' },
    {name: 'products' }
]), createPage);

router.post('/page/update',  requireSignin, adminMiddleware, upload.fields([
    {name: 'banners' },
    {name: 'products' }
]), updatePage);

router.get(`/page/:category/:type`, getPage);

module.exports = router;