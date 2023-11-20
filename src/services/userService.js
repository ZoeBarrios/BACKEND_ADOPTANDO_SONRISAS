import userDTO from "../db/dtos/users/userDTO.js";
export const getAll = async () => {
  const users = await User.find({});
  console.log(users);
  return users.map((user) => userDTO.fromModel(user));
};

export const getByUsername = async (username) => {
  return User.find({ username: username });
};

export const create = async (createDTO) => {
  const newUser = new User({
    ...createDTO,
    password: await User.encryptPassword(createDTO.password),
  });
  await newUser.save();
  return userDTO.fromModel(newUser);
};
