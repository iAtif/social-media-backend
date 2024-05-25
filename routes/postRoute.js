const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const authenticateUser = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("image"),
  authenticateUser,
  PostController.createPost
);
router.put("/:id", authenticateUser, PostController.updatePost);
router.delete("/:id", authenticateUser, PostController.deletePost);
router.put("/:id/like", authenticateUser, PostController.likePost);
router.put("/:id/unlike", authenticateUser, PostController.unlikePost);

router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);

module.exports = router;
