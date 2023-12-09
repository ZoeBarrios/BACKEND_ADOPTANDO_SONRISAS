import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Organization from "./organization.js";
const Financial_Info = sequelize.define(
  "organization_financial_info",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cbu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mp_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false, tableName: "organization_financial_info" }
);

Financial_Info.belongsTo(Organization, { foreignKey: "organization_id" });

export default Financial_Info;
