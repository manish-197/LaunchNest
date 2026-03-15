const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: (false, "Username already exists")
    },
    company: String,
    role: String,
    bio: String,
    location: String,
    email: {
        type: String,
        unique: (true, "Email already exists")
    },
    password: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/4g6mxa8vna/profile_image"
    }
})

const userModel = mongoose.model( "user", userSchema )

module.exports = userModel;