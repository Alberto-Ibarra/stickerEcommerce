const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    street: String,
    unit: String,
    city: String,
    state: String,
    postalCode: String
})

module.exports = mongoose.model('Address', addressSchema);