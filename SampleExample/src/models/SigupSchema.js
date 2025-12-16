const mbd = require('mongoose');

const SignupSchema = mbd.Schema({
    email: String,
    Username: String,
    Password: String,
})

const sigup_schema = mbd.model('signup', SignupSchema);

module.exports = sigup_schema;