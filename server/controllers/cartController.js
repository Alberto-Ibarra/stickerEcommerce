const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const cart = Cart.findOne({user: req.user._id}).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({message:"failed to add item to cart", error});
    }
}

module.exports = {
    getCart
}