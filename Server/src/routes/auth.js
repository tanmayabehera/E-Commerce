const express = require('express');
const { signup, signin } = require('../controllers/auth');
const { requireSignin } = require('../common-middleware/index');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../Validators/auth');
const router = express.Router();


router.get('/',(req, res) => {
    res.send("Hello from server");

});

router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({ user: 'profile' });
})

module.exports = router;