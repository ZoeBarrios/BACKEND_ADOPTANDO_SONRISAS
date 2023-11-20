import bcr from "bcryptjs";
export const compare = async (password, hash) => {
  return await bcr.compare(password, hash);
};
export const hash = async (password) => {
  const salt = await bcr.genSalt(10);
  return await bcr.hash(password, salt);
};
