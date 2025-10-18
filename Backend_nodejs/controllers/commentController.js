const Comment = require("../models/comment");
const User = require("../models/user");





exports.createComment = async (req, res) => {
  try {
    // Default userId for now; replace this with actual user from req.user if authentication is implemented
    const userId = req.body.userId || "92eb0b9c-1df6-4ac1-9046-46db56e6ab05"; // Replace with a valid user ID
    const { discussionId, content, parentCommentId } = req.body;

    if (!discussionId || !content) {
      return res.status(400).json({ error: "Discussion ID and content are required." });
    }

    // Check if parentCommentId exists if provided
    if (parentCommentId) {
      const parentComment = await Comment.findByPk(parentCommentId);
      if (!parentComment) {
        return res.status(400).json({ error: "Invalid parentCommentId provided." });
      }
    }

    const newComment = await Comment.create({
      discussionId,
      content,
      parentCommentId: parentCommentId || null, // Ensure null if not provided
      userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment." });
  }
};



exports.getCommentsByDiscussion = async (req, res) => {
  const { discussionId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { discussionId, parentCommentId: null }, // Fetch only parent comments
      include: [
        {
          model: Comment,
          as: "replies", // Include nested replies
          required: false, // Ensures child comments are optional
          include: [
            {
              model: User,
              as: "author",
              attributes: ["id", "name"], // Include necessary author fields
            },
          ],
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "name"], // Include necessary author fields
        },
      ],
      order: [["createdAt", "ASC"]], // Sort parent comments
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};

exports.incrementLikes = async (req, res) => {
  const { id } = req.params;

  try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
      }
      comment.likes += 1; // Increment likes
      await comment.save();
      res.status(200).json({ message: 'Like added successfully', comment });
  } catch (error) {
      console.error('Error liking comment:', error);
      res.status(500).json({ error: 'Failed to like comment' });
  }
};

