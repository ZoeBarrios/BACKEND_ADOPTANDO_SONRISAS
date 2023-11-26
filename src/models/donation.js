import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const Donation = sequelize.define(
  "donation",
  {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Date.now(),
    },
    donator_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  { timestamps: false }
);

export default Donation;
