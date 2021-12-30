import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

import { IRegisterDTO } from "./auth.dto";
import AuthDAO from "./auth.dao";

class AuthService {
  async register(user: IRegisterDTO) {
    user.id = uuidv4();
    user.password = await argon2.hash(user.password);
    AuthDAO.register(user);
    return user.password;
  }
}

export default new AuthService();
