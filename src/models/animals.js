import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const Animal = sequelize.define(
  "animal",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20],
      },
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255],
      },
    },
    adopted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admission_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

export default Animal;
