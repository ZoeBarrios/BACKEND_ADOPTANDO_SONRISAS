import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Organization from "./organization.js";
const Adoption = sequelize.define(
  "adoption",
  {
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    adoption_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    responsable_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsable_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsable_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Adoption.belongsTo(Organization, { foreignKey: "organization_id" });

export default Adoption;
