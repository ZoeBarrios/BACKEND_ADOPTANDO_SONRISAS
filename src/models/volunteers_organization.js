import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Organization from "./organization.js";
import User from "./user.js";

const Volunteer_Organization = sequelize.define(
  "volunteers_organization",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Volunteer_Organization.belongsTo(Organization, {
  foreignKey: "organization_id",
});

Volunteer_Organization.belongsTo(User, {
  foreignKey: "user_id",
});

export default Volunteer_Organization;
