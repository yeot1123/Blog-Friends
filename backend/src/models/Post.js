const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Post = sequelize.define('Post', {
  postId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true } // ✅ new field for Cloudinary URL
});

module.exports = Post;
