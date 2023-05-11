const mongoose = require("mongoose")
const {Schema}  = mongoose //esqueleto do model

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
}, 
{
    timestamps: true //vai criar os campos created_at e updated_at
})

const User = mongoose.model("User", userSchema)

module.exports = User