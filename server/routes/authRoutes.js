const express = require('express');
const { createUser, getSingleUser, getAllUsers, deleteUser, updateUser } = require('../controller/AuthControllers');
const router = express.Router();


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



//export
module.exports = router