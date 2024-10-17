const express = require("express");
const router = express.Router();
const stickerContoller = require("../controllers/stickerContoller");

router.get("/", stickerContoller.getAllStickers)

router.get("/cart", (req,res) => {
    console.log('cart');
    res.send("test cart route")
})

module.exports = router;