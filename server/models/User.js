const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    address:{
        street: String,
        unit: String,
        city: String,
        state: String,
        postalCode: String,
    },
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

module.exports = mongoose.model('User', userSchema);