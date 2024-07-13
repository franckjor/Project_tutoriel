const express = require('express');
const router = express.Router();

// mon controllers
const userCtrl = require("../Controllers/User.controller");

// mes middlewares
const auth = require ("../Middlewares/Auth");
const adminAuth = require("../Middlewares/AdminAuth");


/**
 * proteger avec un middleware qui filtre le role admin
 */
// route get
router.get('/',adminAuth, userCtrl.getAllUsers);
// recuperation data avec un parametre
router.get('/:id', userCtrl.getUserById);
// modification route put
router.put('/changePassword', auth, userCtrl.modifyPassword);
router.put('/:id',adminAuth , userCtrl.modifyUserAdmin);
router.put('/',auth , userCtrl.modifyUser);
// route de supression
router.delete('/:id',adminAuth, userCtrl.deleteUser);
// route post
router.post('/',adminAuth, userCtrl.createUser);

router.post('/forgot', userCtrl.forgotPassword);
router.post('/renew', userCtrl.renewPassword);



module.exports = router;