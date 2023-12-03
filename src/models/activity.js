import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Activity = sequelize.define(
  "activitie",
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Activity;
