const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');


const Comment = sequelize.define('Comment', {
  commentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false }
});


module.exports = Comment;
