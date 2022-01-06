import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { ILoginDTO, IRegisterDTO } from "./auth.dto";
import usersDao from "../users/users.dao";

const jwtSecret = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 86400;
class AuthService {
  async register(payload: IRegisterDTO) {
    try {
      payload._id = uuidv4();
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
      await usersDao.register(payload);
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
      const refreshId = payload._id + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const refreshToken = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");

      const token = jwt.sign(
        { userId: payload._id, refreshKey: salt.export() },
        String(jwtSecret),
        { expiresIn: tokenExpirationInSeconds }
      );

      return { token, tokenExpirationInSeconds, refreshToken };
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
