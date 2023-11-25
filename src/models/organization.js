import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const Organization = sequelize.define(
  "organization",
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
        len: [1, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instagram_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isEliminated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

export default Organization;
