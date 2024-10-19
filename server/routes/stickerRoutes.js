const express = require("express");
const router = express.Router();
const stickerContoller = require("../controllers/stickerContoller");

router.get("/", stickerContoller.getAllStickers);
router.get("/product/:id", stickerContoller.getStickerById);
router.post("/product", stickerContoller.createSticker);
router.delete("/product/:id", stickerContoller.deleteStickerById);
router.put("/product/:id", stickerContoller.findStickerByIdAndUpdate);
router.get("/category", stickerContoller.getStickersByCategory);
router.get("/stickers", stickerContoller.getPaginatedStickers);

module.exports = router;