const Product = require('../models/Product');

const getAllStickers = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error})
    }
};

module.exports = {getAllStickers}