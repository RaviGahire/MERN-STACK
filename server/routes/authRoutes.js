const express = require('express');
const { createUser, getSingleUser, getAllUsers, deleteUser, updateUser,userLogin,dashBoard,userProfile } = require('../controller/AuthControllers');
const userSchema = require('../model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router();

//===============================CRUD API'S and routes====================================
// Routers and API creation
router.get('/', async (req, res) => {
    // return is must 
    try {
        return res.status(200).json({
            success: true,
            message: 'Auhentication API is working properly',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Authentication API is not working',
            error: error
        })
    }
});

//create user 
router.post('/createuser', createUser)

//get all user
router.get('/users', getAllUsers)

// get single user from database
router.get('/users/:id', getSingleUser)

// Delete id 
router.delete('/users/:id', deleteUser)

// Update user
router.put('/users/:id', updateUser);


//===============================AUTH API'S and routes====================================
//user login
router.post('/login', userLogin )


//role based login
const verifyJWTToken = require('../middlewares/auth_middleware');
const authorizedRole = require('../middlewares/authorizeRoles')

//dashboard
router.get('/dashboard',verifyJWTToken, authorizedRole('user') ,dashBoard)

//profile
router.get('/profile',verifyJWTToken, userProfile)







//export
module.exports = router