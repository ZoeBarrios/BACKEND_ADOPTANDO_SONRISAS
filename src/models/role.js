import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Role = sequelize.define(
  "role",
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Role;
