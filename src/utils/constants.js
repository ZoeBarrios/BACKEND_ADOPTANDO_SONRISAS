export const SIZES = {
  PEQUEÑO: "Pequeño",
  MEDIANO: "Mediano",
  GRANDE: "Grande",
};

export const ROLES = {
  ADMIN: "Admin",
  MODERATOR: "Moderator",
  SUPERADMIN: "SuperAdmin",
  USER: "User",
};

export const AGE = {
  CACHORRO: "CACHORRO",
  ADULTO: "ADULTO",
  ANCIANO: "ANCIANO",
};

export const ERRORS = {
  UserAlreadyExist: {
    name: "UsuarioExistente",
    status: 400,
    message: "El usuario ya existe",
  },
  WrongRole: {
    name: "RolIncorrecto",
    status: 400,
    message: "El rol no es válido",
  },
  UserNotFound: {
    name: "UsuarioNoEncontrado",
    status: 404,
    message: "El usuario no existe",
  },
  Unauthorized: {
    name: "NoAutorizado",
    status: 401,
    message: "No estás autorizado para acceder al recurso",
  },
  ValidationError: {
    name: "ErrorValidación",
    status: 400,
    message: "Error de validación",
  },
  NotFound: {
    name: "NoEncontrado",
    status: 404,
    message: "No se encontró el recurso",
  },
  WrongCredentials: {
    name: "CredencialesIncorrectas",
    status: 400,
    message: "Usuario o contraseña incorrectos",
  },
  NoImageSend: {
    name: "NoImagen",
    status: 400,
    message: "No se envió ninguna imagen",
  },
  IdRequired: {
    name: "IdRequerido",
    status: 400,
    message: "El id es requerido",
  },
  NotEnoughPermissions: {
    name: "PermisosInsuficientes",
    status: 403,
    message: "No tienes permisos suficientes para realizar esta acción",
  },
};
