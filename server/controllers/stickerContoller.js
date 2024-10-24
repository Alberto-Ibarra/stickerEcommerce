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
};

const createSticker = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, categories } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
            categories
        });
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: "Creating a sticker failed", error})
    }
}


const findStickerByIdAndUpdate = async (req,res) => {
    try {
        const productId = req.params.id;
        const updateProduct = await Product.findByIdAndUpdate(productId);
        res.status(200).json({message: "Product updated!"}).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: "Update failed", error});
    }
};

const getStickersByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const products = await Product.find({categories: category});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "category search failed", error});
    }
};

const deleteStickerById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await Product.deleteOne({ _id: productId});
        res.status(500).json({message: "Product deleted"});
    } catch (error) {
        res.status(500).json({message: "Delete failed", error});
    }
};

const getPaginatedStickers = async (req, res) => {
    try {
        const { page = 1, limit = 2 } = req.query;
        const skip = (page - 1) * limit;
        const stickers = await Product.find().skip(Number(skip)).limit(Number(limit));
        const total = await Product.countDocuments();
        res.status(200).json({
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            stickers
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stickers", error });
    }
};

const searchStickers = async (req, res) => {
    try {
        const { query } = req.query;
        const filter = {};
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { categories: { $regex: query, $options: 'i' } }
            ];
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error searching stickers", error });
    }
};

module.exports = {
    getAllStickers, 
    getStickerById,
    createSticker,
    deleteStickerById, 
    findStickerByIdAndUpdate, 
    getStickersByCategory,
    getPaginatedStickers,
    searchStickers
}