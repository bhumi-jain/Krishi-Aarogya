const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Discussion = sequelize.define("Discussion", {
  id: {
    type: DataTypes.INTEGER, // Change id to INTEGER
    primaryKey: true,
    autoIncrement: true, // Enable auto-increment
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID, // User ID remains UUID
    allowNull: true,
  },
  upvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Default to 0 upvotes
  },
  imageUrl: {
    type: DataTypes.STRING, // New field for storing S3 URL
    allowNull: true, // Optional field
  },
});

// Relationships
Discussion.belongsTo(User, { foreignKey: "userId", as: "author" });
User.hasMany(Discussion, { foreignKey: "userId" });

module.exports = Discussion;
