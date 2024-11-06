const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user._id}).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const order = new Order({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            totalPrice: cart.totalPrice,
            status: 'pending'
        })

        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({message: "order create failed"});
    }
}

module.exports = {
    createOrder
}