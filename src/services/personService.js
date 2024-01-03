import Person from "../models/person.js";
import Role from "../models/role.js";
import { createPersons_Organizationss } from "./person_organizationService.js";
import { ACTIVITIES, ROLES } from "../utils/constants.js";
import { hash } from "./bcryptService.js";
import Activity from "../models/activity.js";
import { ERRORS } from "../utils/errors.js";
import { send } from "./emailService.js";
import { appConfig } from "../config/config.js";

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
  try {
    const roleFound = await Role.findOne({
      where: { role_name: role },
    });

    if (!roleFound) {
      throw new Error(ERRORS.WrongRole);
    }

    const role_id = roleFound.role_id;
    const hashedPassword = await hash(person.password);

    const newUser = await Person.create({
      ...person,
      role_id,
      password: hashedPassword,
    });

    if (role === ROLES.USER) {
      return newUser;
    }

    const activityFound = await Activity.findOne({
      where: { activity_name: ACTIVITIES.Management },
    });

    if (!activityFound) {
      throw new Error(ERRORS.WrongActivity);
    }

    await createPersons_Organizationss({
      person_id: newUser.person_id,
      organization_id: person.organization_id,
      activity_id: activityFound.activity_id,
    });

    //MANDO UN CORREO AL USUARIO CON SUS CREDENCIALES DE ACCESO
    await send(
      {
        to: person.email,
        subject: "Bienvenido a Adoptando Sonrisas",
        text: `Hola ${person.name}, bienvenido a Adoptando Sonrisas, tu usuario es: ${person.email} y tu contraseña es: ${person.password}. Asegurate de cambiar tu contraseña en cuanto inicies sesión.`,
      },
      appConfig.email
    );

    return newUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateUser = async (person, person_id) => {
  try {
    const userFound = await Person.findByPk(person_id);
    if (!userFound) {
      return null;
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
    await person.update({ password: await hash(password) });
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteUser = async (person_id) => {
  try {
    const userFound = await Person.findByPk(person_id);
    if (!userFound) {
      return null;
    }
    await userFound.update({ isActive: false });
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
