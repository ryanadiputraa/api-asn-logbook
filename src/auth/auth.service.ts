import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

import { IRegisterDTO } from "./auth.dto";
import AuthDAO from "./auth.dao";
import { logger } from "../common/logger";

class AuthService {
  async register(user: IRegisterDTO) {
    try {
      user.id = uuidv4();
      user.password = await argon2.hash(user.password);
      AuthDAO.register(user);
      return user.password;
    } catch (error) {
      logger.error(`auth service: ${error}`);
      throw new Error(
        error instanceof Error ? error.message : "fail to register"
      );
    }
  }
}

export default new AuthService();
