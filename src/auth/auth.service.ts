import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { IAccessTokenDTO, ILoginDTO, IRegisterDTO } from "./auth.dto";
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

  async login(payload: ILoginDTO): Promise<IAccessTokenDTO> {
    try {
      return await this.generateToken(payload._id);
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

  generateToken(id: string): IAccessTokenDTO {
    try {
      const refreshId = id + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const refreshToken = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");

      const token = jwt.sign(
        { userId: id, refreshKey: salt.export() },
        String(jwtSecret),
        { expiresIn: tokenExpirationInSeconds }
      );

      return {
        access_token: token,
        expired_at: tokenExpirationInSeconds,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new Error(
        `auth service: ${
          error instanceof Error
            ? error.message
            : "fail to generate access token"
        }`
      );
    }
  }
}

export default new AuthService();
