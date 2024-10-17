const express = require("express");
const router = express.Router();
const stickerContoller = require("../controllers/stickerContoller");

router.get("/", stickerContoller.getAllStickers)

module.exports = router;