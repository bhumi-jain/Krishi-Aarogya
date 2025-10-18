const Discussion = require("../models/discussion");
const { v4: isUUID } = require("uuid");


const Comment = require("../models/comment");
const User = require("../models/user");

exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.findAll({
      include: [
        { model: User, as: "author", attributes: ["id", "name", "email"] },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "author", attributes: ["id", "name", "email"] },
            {
              model: Comment,
              as: "replies",
              include: { model: User, as: "author", attributes: ["id", "name", "email"] },
            },
          ],
        },
      ],
    });

    res.status(200).json(discussions);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ error: "Failed to fetch discussions" });
  }
};




exports.createDiscussion = async (req, res) => {
  try {
    const { title, description, category, tags, userId } = req.body;

    if (!title || !description || !category || !userId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Parse tags if they are sent as a JSON string
    const parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);

    // Get the file URL if an image was uploaded
    const imageUrl = req.file ? req.file.location : null;

    const newDiscussion = await Discussion.create({
      title,
      description,
      category,
      tags: parsedTags,
      userId,
      imageUrl, // Save the image URL
    });

    res.status(201).json(newDiscussion);
  } catch (error) {
    console.error("Error in createDiscussion:", error);
    res.status(500).json({ error: "Failed to create discussion." });
  }
};


exports.incrementUpvotes = async (req, res) => {
  const { id } = req.params;

  try {
    const discussion = await Discussion.findByPk(id);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    discussion.upvotes += 1;
    await discussion.save();
    res.status(200).json({ message: "Upvote added successfully", discussion });
  } catch (error) {
    console.error("Error incrementing upvotes:", error);
    res.status(500).json({ error: "Failed to increment upvotes" });
  }
};

exports.getDiscussionById = async (req, res) => {
  const { id } = req.params;

  try {
    const discussion = await Discussion.findByPk(id, {
      include: [
        {
          model: Comment,
          as: "comments",
          include: [
            {
              model: Comment,
              as: "replies",
              include: { model: User, as: "author" },
            },
            { model: User, as: "author" },
          ],
        },
      ],
    });

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    res.status(200).json(discussion);
  } catch (error) {
    console.error("Error fetching discussion:", error);
    res.status(500).json({ error: "Failed to fetch discussion" });
  }
};