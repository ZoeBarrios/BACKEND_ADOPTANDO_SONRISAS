import { DataTypes, literal } from "sequelize";
import { sequelize } from "../config/db.js";
import Animal from "./animal.js";
import person from "./person.js";

const Adoption = sequelize.define(
  "adoption",
  {
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    adoption_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Adoption.belongsTo(Animal, { foreignKey: "animal_id" });
Adoption.belongsTo(person, { foreignKey: "person_id" });

export default Adoption;
