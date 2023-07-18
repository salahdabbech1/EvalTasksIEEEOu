//packages
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

// model
const UserModel = require("../models/UserModel")



const signUp = async (req, res) => {
    let newUser = new UserModel()
    try {
        newUser.email = req.body.email ?? ""
        newUser.password = req.body.password ?? ""
        newUser.fullName = req.body.fullName ?? ""
        await newUser.save()
        res.status(200).json({ success: true, message: "user added successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const signIn = async (req, res) => {
    try {
        let foundUser = await UserModel.findOne({ email: req.body.email })
        if (!foundUser) res.status(404).json({ success: false, message: 'this user does not exist' })
        if (foundUser.comparePassword(req.body.password)) {
            let token = jwt.sign(foundUser.toJSON(), "secret")
            res.status(200).json({ success: true, token: token, user: foundUser })
        } else res.status(403).json({ success: false, message: "this email and password combination does not exist" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const currentUser = async (req, res) => {
    try {
        let foundUser = await UserModel.findById(req.decoded._id)
        if (foundUser) res.status(200).json({ sucess: true, user: foundUser })
        else res.status(404).json({ success: false, message: 'this user does not exist' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const deleteUser = async (req, res) => {
    try {
        let deletedUser = await UserModel.findOneAndDelete({ _id: req.params.id },)
        if (deletedUser) res.status(200).json({ success: true, message: "user deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const updateUser = async (req, res) => {
    try {
        let updatedUser = await UserModel.findByIdAndUpdate(req.decoded._id, { $set: { email: req.body.email } })
        if (updatedUser) res.status(200).json({ success: true, updatedUser: updatedUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = {
    signIn, signUp, currentUser, deleteUser, updateUser
}