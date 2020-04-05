const mongoose = require('mongoose');

const generateHash = require('../utils/generateHash');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function(next) {
    this.password = await generateHash(this.password);
    next();
});

module.exports = mongoose.model('User', UserSchema);;