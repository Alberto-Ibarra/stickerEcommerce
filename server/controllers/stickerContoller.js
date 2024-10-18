const { options } = require('joi');
const Product = require('../models/Product');

const getAllStickers = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error});
    }
};

const getStickerById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "Error fetching product", error});
    }
}

const findStickerByIdAndUpdate = async (req,res) => {
    try {
        const productId = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(productId);
        res.status(200).json({message: "Product updated!"}).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: "Update failed"});
    }
}

const deleteStickerById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await Product.deleteOne({ _id: productId});
        res.status(500).json({message: "Product deleted"});
    } catch (error) {
        res.status(500).json({message: "Delete failed"});
    }
}

module.exports = {getAllStickers, getStickerById, deleteStickerById, findStickerByIdAndUpdate}