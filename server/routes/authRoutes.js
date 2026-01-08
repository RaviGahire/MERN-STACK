const express = require('express');
const userSchema = require('../model/userSchema')
const bcrypt = require('bcrypt');
const router = express();


// Routers and API creation
router.get('/', (req, res) => {
    // return is must 
    return res.status(200).json({
        success: true,
        message: 'API IS CREATED AND WORKING PROPERLY',
        data: {
            name: 'Ravi',
            role: 'MERN STACK'
        }
    })
});

//get all user
router.get('/users', async (req, res) => {
    try {

        const users_data = await userSchema.find()
        return res.status(200).json({
            success: true,
            message: "users data fetched successfully",
            data: users_data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error
        })
    }
})

// get single user from database
router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userSchema.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Single user fetched successfully',
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching single user data',
            error: error.message
        });
    }
});


//create user 
router.post('/create_user', async (req, res) => {
    try {
        const { firstname, lastname, phone, email, city, password } = req.body

        const hashPass = await bcrypt.hash(password, 10);

        const new_user = new userSchema({ firstname, lastname, phone, email, city, password: hashPass });

        await new_user.save();

        return res.status(200).json({
            success: true,
            message: 'user created successfully'
        })


    } catch (error) {

        return res.status(500).json({
            success: true,
            message: 'internal server error',
            error: error
        })

    }
})

// Delete id 
router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteuser = await userSchema.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: 'user deleted successfully',
          
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error while deleting user data',
            error: error
        });
    }
})

//export
module.exports = router