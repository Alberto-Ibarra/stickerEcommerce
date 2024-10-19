const express = require("express");
const router = express.Router();
const stickerController = require("../controllers/stickerContoller");

router.get("/", stickerController.getAllStickers);
router.get("/product/:id", stickerController.getStickerById);
router.post("/product", stickerController.createSticker);
router.delete("/product/:id", stickerController.deleteStickerById);
router.put("/product/:id", stickerController.findStickerByIdAndUpdate);
router.get("/category", stickerController.getStickersByCategory);
router.get("/stickers", stickerController.getPaginatedStickers);
router.get("/search", stickerController.searchStickers);

module.exports = router;