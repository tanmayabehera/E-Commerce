const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { requireSignin } = require('../../common-middleware')
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../Validators/auth');
const router = express.Router();


router.get('/',(req, res) => {
    res.send("Hello from server");

});

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', signout);

module.exports = router;