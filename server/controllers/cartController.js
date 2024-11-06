const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
    try {
        const cart = Cart.findOne({user: req.user._id}).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({message:"failed to find cart", error});
    }
}

const addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log(productId);
        // Find the product details to calculate the price
        const product = await Product.findById(productId);
        console.log(product);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Find or create the user's cart
        let cart = await Cart.findOne({ user: req.user._id });
        console.log(cart);
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
        }

        // Check if the item is already in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // If the item exists, update its quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If the item does not exist, add it to the cart
            cart.items.push({ product: productId, quantity });
        }

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            const itemPrice = item.quantity * product.price; // use the product's price
            return total + itemPrice;
        }, 0);

        await cart.save();
        console.log("before status 200");
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getCart,
    addItemToCart
}