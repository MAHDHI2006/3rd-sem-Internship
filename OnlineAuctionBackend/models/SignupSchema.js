const mdb = require('mongoose')

const signupSchema = mdb.Schema({
    email: String,
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    userType: { type: String, enum: ['buyer', 'seller', 'both'], default: 'buyer' }
})

const signup_schema = mdb.model("signup",signupSchema)
module.exports = signup_schema;