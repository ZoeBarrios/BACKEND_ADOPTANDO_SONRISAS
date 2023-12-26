import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Animal from "./animal.js";
const Case = sequelize.define(
  "case",
  {
    case_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

Case.belongsTo(Animal, { foreignKey: "animal_id", as: "animal" });

export default Case;
