const express = require("express");
const router = express.Router();
const postController = require("../controller/posts");
const { uploadMultiple } = require("../middlewares/upload");

router.post("/", uploadMultiple, postController.createPost);

module.exports = router;
