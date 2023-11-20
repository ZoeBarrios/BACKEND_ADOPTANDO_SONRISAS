import * as userService from "../services/userService.js";

export const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.success(200, users);
};
