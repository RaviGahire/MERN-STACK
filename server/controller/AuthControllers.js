const express = require('express');
const userSchema = require('../model/userSchema')
const bcrypt = require('bcrypt');

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