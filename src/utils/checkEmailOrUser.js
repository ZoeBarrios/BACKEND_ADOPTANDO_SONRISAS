export default function checkEmailOrUser(emailOrUser) {
  const isEmail = /\S+@\S+\.\S+/.test(emailOrUser);

  return { isEmail };
}
