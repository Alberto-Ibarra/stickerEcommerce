const express = require("express");
const router = express.Router();
const stickerContoller = require("../controllers/stickerContoller");

router.get("/", stickerContoller.getAllStickers);
router.get("/product/:id", stickerContoller.getStickerById);
router.delete("/product/:id", stickerContoller.deleteStickerById);
router.put("/product/:id", stickerContoller.findStickerByIdAndUpdate);

module.exports = router;