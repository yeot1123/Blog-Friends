const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');


const Comment = sequelize.define('Comment', {
  commentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  postId: { type: DataTypes.INTEGER, allowNull: false }
});


module.exports = Comment;
