const express = require('express');
const userSchema = require('../model/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//=======================CRUD Controllers==============================
// create user controller
exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, phone, email, city, password } = req.body

        const hashPass = await bcrypt.hash(password, 10);

        const new_user = new userSchema({ firstname, lastname, phone, email, city, password: hashPass });

        await new_user.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: new_user
        })


    } catch (error) {

        return res.status(500).json({
            success: true,
            message: 'internal server error',
            error: error
        })

    }
}

// Get single user controller
exports.getSingleUser = async (req, res) => {
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
}
// Get all users controller
exports.getAllUsers = async (req, res) => {
    try {

        const users_data = await userSchema.find()
        return res.status(200).json({
            success: true,
            message: "Users data fetched successfully",
            data: users_data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching users data',
            error: error
        })
    }
}

// Delete user controller
exports.deleteUser = async (req, res) => {
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
}

// Update user controller
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstname, lastname, phone, email, city, password } = req.body;
        const updateduser = await userSchema.findByIdAndUpdate(
            id,
            { firstname, lastname, phone, email, city, password },
            { new: true }
        );      
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updateduser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error while updating user data',
            error: error
        });
    }
}


//============================AUTH Controllers===================================
// login controller and jwt token 
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const isUserExists = await userSchema.findOne({ email: email })

        //check if user exists or not 
        if (!isUserExists) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        // match password 
        const isPassMatch = await bcrypt.compare(password, isUserExists.password)

        if (!isPassMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        //check both
        if (isUserExists && isPassMatch) {

            //jwt token payload
            const jwt_token = jwt.sign(
                //imp users details for verifaction of user
                { id: isUserExists._id, userEmail: isUserExists.email, userRole: isUserExists.role },
                //secretKey
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1h"
                }

            )


            return res.status(200).json({
                success: true,
                message: 'User logged in Successfully',
                 // data: isUserExists
                token: jwt_token
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error
        })

    }
}

exports.dashBoard = async (req,res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Dashboard page open successfully"
        })

    } catch (error) {

        return res.status(403).json({
            success: false,
            message: 'No Premissions to open this page..!'
        })

    }
}