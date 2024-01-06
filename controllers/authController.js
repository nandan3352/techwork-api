const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ username }).exec()
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    const accessToken="34c99fdb47351625f53c471c262fcbf14b0c35d4176a68e2f7b90693c09c316b8d"
    res.json({ accessToken })
})
const logout = (req, res) => {
  localStorage.removeItem("userId");
    res.json({ message: 'Logged Out' })
}
module.exports = {
    login,
    logout
}