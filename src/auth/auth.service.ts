import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

import { ILoginDTO, IRegisterDTO } from "./auth.dto";
import authDao from "./auth.dao";
import { logger } from "../common/logger";

class AuthService {
  async register(payload: IRegisterDTO) {
    try {
      payload._id = uuidv4();
      payload.password = await argon2.hash(payload.password);
      await authDao.register(payload);
    } catch (error) {
      throw new Error(
        `auth service: ${
          error instanceof Error ? error.message : "fail to register"
        }`
      );
    }
  }

  async login(payload: ILoginDTO) {
    try {
      const user = await authDao.login(payload.nip);
      return user;
    } catch (error) {
      throw new Error(
        `auth service: ${
          error instanceof Error
            ? error.message
            : "nip or password didn't match"
        }`
      );
    }
  }
}

export default new AuthService();
