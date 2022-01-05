import { v4 as uuidv4 } from "uuid";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { ILoginDTO, IRegisterDTO } from "./auth.dto";
import authDao from "./auth.dao";

const jwtSecret = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 86400;
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
