import { DATE, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Person from "./person.js";
import Organization from "./organization.js";
const Persons_Organizations = sequelize.define(
  "persons_organization",
  {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    joinedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false }
);

Persons_Organizations.belongsTo(Person, {
  foreignKey: "person_id",
});

Persons_Organizations.belongsTo(Organization, {
  foreignKey: "organization_id",
});

export default Persons_Organizations;
