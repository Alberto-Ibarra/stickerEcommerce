const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    orderItems: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref : 'Product', required: true},
            quantity: {type: Number, required: true}
        }
    ],
    shippingAddress: {street: String, city: String, postalCode: String, country: String}, 
    totalPrice: {type: Number, required: true},
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