const express = require("express");
const {
  getAllDiscussions,
  createDiscussion,
  incrementUpvotes,
  getDiscussionById,
} = require("../controllers/discussionController");
const upload = require("../config/multerConfig"); // Import Multer configuration

const router = express.Router();

router.get("/display", getAllDiscussions);

// Updated to handle image uploads
router.post("/create", upload.single("image"), createDiscussion);

router.patch("/:id/upvotes", incrementUpvotes);

router.get("/:id", getDiscussionById);

module.exports = router;
