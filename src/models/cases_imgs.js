import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const Case_img = sequelize.define(
  "cases_img",
  {
    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

export default Case_img;
