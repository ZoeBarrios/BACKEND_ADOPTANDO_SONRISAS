import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Role from "./Role.js";
import { literal } from "sequelize";
const Person = sequelize.define(
  "person",
  {
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      },
    },
    surname: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        len: [1, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    joined_date: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP"),
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30],
      },
    },
    token_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "persons",
  }
);

Person.belongsTo(Role, { foreignKey: "role_id" });

export default Person;
