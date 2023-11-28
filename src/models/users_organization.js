import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";
const User_Organization = sequelize.define(
  "users_organization",
  {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

User_Organization.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

export default User_Organization;
