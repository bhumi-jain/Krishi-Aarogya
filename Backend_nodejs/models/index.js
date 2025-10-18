const sequelize = require("../config/database");
const User = require("./user");
const Discussion = require("./discussion");
const Comment = require("./comment");

// User - Discussion Relationship
User.hasMany(Discussion, { foreignKey: "userId" });
Discussion.belongsTo(User, { foreignKey: "userId", as: "discussionAuthor" }); // Changed alias to "discussionAuthor"

// User - Comment Relationship
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "commentAuthor" }); // Changed alias to "commentAuthor"

// Discussion - Comment Relationship
Discussion.hasMany(Comment, { foreignKey: "discussionId", as: "comments" });
Comment.belongsTo(Discussion, { foreignKey: "discussionId" });

// Nested Comment Relationship
Comment.belongsTo(Comment, { foreignKey: "parentCommentId", as: "parent" });
Comment.hasMany(Comment, { foreignKey: "parentCommentId", as: "nestedReplies" });



module.exports = { sequelize, User, Discussion, Comment };
