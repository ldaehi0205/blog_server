import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

const DataTypes = SQ.DataTypes;

export const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
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

export const createPost = async (title, writer_id, create_at, content) => {
  return await Post.create({ title, writer_id, create_at, content });
};

export const getPostId = async id => {
  return await Post.findOne({ where: { id } });
};

export const getPostPage = async page => {
  const LIMIT = 10;
  return await Post.findAndCountAll({
    offset: Number(page * LIMIT),
    limit: LIMIT,
  });
};
