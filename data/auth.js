import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Post } from './post.js';
import { Comment } from './comment.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  { timestamps: false }
);
User.hasMany(Post, { foreignKey: 'writer_id', sourceKey: 'id' });
Post.belongsTo(User, { foreignKey: 'writer_id', sourceKey: 'id' });

User.hasMany(Comment, { foreignKey: 'commenter', sourceKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'commenter', sourceKey: 'id' });

Post.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', sourceKey: 'id' });

export const createUser = async (user_id, password, name, email) => {
  return await User.create({ user_id, password, name, email });
};

export const checkAlreadyUser = async user_id => {
  return await User.findOne({ where: { user_id } });
};
