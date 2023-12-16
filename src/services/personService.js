import Person from "../models/person.js";
import Role from "../models/role.js";
import { createPersons_Organizationss } from "./person_organizationService.js";
import { ACTIVITIES, ERRORS, ROLES } from "../utils/constants.js";
import { hash } from "./bcryptService.js";
import { sequelize } from "../config/db.js";

export const getByEmail = async (email) => {
  try {
    const person = await Person.findOne({
      where: { email: email },
      include: [{ model: Role, attributes: ["role_name"] }],
    });
    if (!person) {
      return null;
    }
    return person;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getByUsername = async (nombre) => {
  try {
    const person = await Person.findOne({
      where: { name: nombre },
      include: [{ model: Role, attributes: ["role_name"] }],
    });

    if (!person) {
      return null;
    }

    return person;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const savePasswordToken = async (person, token) => {
  try {
    person.token_password = token;
    await person.save();
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const person = await Person.findByPk(id);
    if (!person) {
      return null;
    }
    return person;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const createUser = async (person, role) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const roleFound = await Role.findOne({
      where: { role_name: role },
      transaction,
    });

    if (!roleFound) {
      throw new Error(ERRORS.WrongRole);
    }

    person.role_id = roleFound.role_id;
    person.password = await hash(person.password);
    const newUser = await Person.create(person, { transaction });

    if (role == ROLES.USER) {
      await transaction.commit();
      return newUser;
    }

    const activityFound = await Activity.findOne({
      where: { activity_name: ACTIVITIES.Management },
      transaction,
    });

    if (!activityFound) {
      throw new Error(ERRORS.WrongActivity);
    }

    await createPersons_Organizationss({
      person_id: newUser.person_id,
      organization_id: person.organization_id,
      activity_id: activityFound.activity_id,
      transaction,
    });

    await transaction.commit();
    return newUser;
  } catch (error) {
    console.error(error.message);
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
};

export const updateUser = async (person, person_id) => {
  try {
    const userFound = await Person.findByPk(person_id);
    if (!userFound) {
      throw new Error(ERRORS.UserNotFound);
    }

    await userFound.update(person);
    return userFound;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const newPassword = async (person, password) => {
  try {
    person.password = await hash(password);
    await person.save();
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
