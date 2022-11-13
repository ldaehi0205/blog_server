import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const Comment = sequelize.define(
  'comment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    create_at: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export const createComment = async (post_id, commenter, content) => {
  const create_at = new Date();
  return await Comment.create({
    post_id,
    commenter,
    create_at: String(create_at),
    content,
  });
};

export const getComments = async id => {
  return await Comment.findAll({ where: { post_id: id } });
};
