const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");
const Discussion = require("./discussion");


const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  parentCommentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  discussionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
Comment.belongsTo(Comment, { foreignKey: "parentCommentId", as: "parentComment" });
Comment.hasMany(Comment, { foreignKey: "parentCommentId", as: "replies" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });
Comment.belongsTo(Discussion, { foreignKey: "discussionId", as: "discussion" });

module.exports = Comment;
