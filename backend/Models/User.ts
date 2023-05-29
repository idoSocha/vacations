// user_code, private_name, last_name, email, password, role
class User {
  public user_code: number;
  public private_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public isAdmin: boolean; // to check if should be really boolean

  constructor(
    user_code: number,
    private_name: string,
    last_name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    this.user_code = user_code;
    this.private_name = private_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin; // check if to put as a boolean and how the system will know if its admin or a user
  }
}

export default User;
