const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true},
    shippingAddress: {street: String, city: String, postalCode: String, country: String}, 
    paymentMethod : {type: String, required: true},
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    orderStatus: {type: String, default: 'Processing'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);