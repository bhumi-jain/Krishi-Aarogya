const express = require("express");
const { createComment, getCommentsByDiscussion } = require("../controllers/commentController");
const { incrementLikes } = require('../controllers/commentController');
const router = express.Router();

// POST: Add a comment to a discussion
router.post("/create", createComment);

// GET: Fetch comments for a specific discussion
router.get("/:discussionId", getCommentsByDiscussion);

router.patch('/:id/likes', incrementLikes);

module.exports = router;
