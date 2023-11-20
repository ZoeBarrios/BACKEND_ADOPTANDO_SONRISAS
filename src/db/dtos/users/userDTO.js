class userDTO {
  constructor(id, username, email, roles) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  static fromModel(user) {
    return new userDTO(user.id, user.username, user.email, user.roles);
  }
}

export default userDTO;
