import UserService from "../user/user.service";
import User from "../user/model/user.model";
import Me from "./model/me.model";
import { InputAuthType } from "./types";

class AuthService {
  constructor(private readonly usersService: UserService) {}

  login({ email, password }: InputAuthType): Me | null {
    const userLogged = this._validateUser({ email, password });

    if (!userLogged) {
      return null;
    }

    Me.setInstance(userLogged);
    return Me.getInstance();
  }

  logout(): void {
    Me.clearInstance();
  }

  private _validateUser({ email, password }: InputAuthType): User | null {
    const user = this.usersService.findAllUsers(
      (user) => user.email === email
    )?.[0];

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}

export default AuthService;
