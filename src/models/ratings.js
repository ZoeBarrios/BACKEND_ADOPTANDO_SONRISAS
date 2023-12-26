import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Animal from "./animal.js";
import Person from "./person.js";

const Rating = sequelize.define(
  "rating",
  {
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    animal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Rating.belongsTo(Animal, { foreignKey: "animal_id", as: "animal" });
Rating.belongsTo(Person, { foreignKey: "rater_id", as: "rater" });
Rating.belongsTo(Person, { foreignKey: "person_id", as: "person" });

export default Rating;
