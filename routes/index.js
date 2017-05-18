var express = require('express');
var router = express.Router();
var authCtrl = require('./../controllers/auth');
var checkToken = require('./../services/checkToken');
var fileUpload = require('./../services/fileUpload');
var userCtrl = require('./../controllers/user');
var adminCtrl = require('./../controllers/admin');
var socialCtrl = require('./../controllers/social');
var roleCtrl = require('./../controllers/role');

/* All API routes */

// Users route
router.post('/user/signup', authCtrl.userRegister);

router.post('/user/login', authCtrl.userLogin);

// get user List
router.get('/users', checkToken.validateToken, checkToken.isAdmin, userCtrl.getUserList);

router.post('/users/create', userCtrl.createUser);

router.get('/users/:id', checkToken.validateToken, checkToken.isAdmin, userCtrl.getUserDetails);

router.put('/users/update', checkToken.validateToken, checkToken.isAdmin, userCtrl.updateUserDetails);

router.delete('/users/:id', checkToken.validateToken, checkToken.isAdmin, userCtrl.deleteUser);



//role Routes
router.post('/role/create', roleCtrl.creteRole);

router.get('/role', roleCtrl.getRoles);

router.put('/role/update', roleCtrl.updateRole);

router.delete('/role/:id', roleCtrl.deleteRole);

//upload image
router.post('/uploadImage', checkToken.validateToken, fileUpload.uploadObj, fileUpload.uploadImage);
//upload icon
router.post('/uploadIconImage', checkToken.validateToken, fileUpload.uploadIconObj, fileUpload.uploadIconImage);

// fb Router
router.post('/signup/facebook', socialCtrl.addFacebookUsers);

// google Router
router.post('/signup/google', socialCtrl.addGoogleUser);


// Admin routes
router.post('/admin/login', authCtrl.adminLogin);

// Create admins

router.post('/admin/create', checkToken.validateToken, checkToken.isAdmin, adminCtrl.createAdminUser);

router.put('/admin/update', checkToken.validateToken, checkToken.isAdmin, adminCtrl.updateAdminUser);

router.get('/admin', checkToken.validateToken, checkToken.isAdmin, adminCtrl.getAdminUserList);

router.delete('/admin/:id', checkToken.validateToken, checkToken.isAdmin, adminCtrl.deleteAdminUser);

router.get('/admin/:adminId', checkToken.validateToken, checkToken.isAdmin, adminCtrl.getAdminUserDetails);

module.exports = router;
