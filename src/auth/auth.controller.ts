import express from "express";

import authService from "./auth.service";
import { logger } from "../common/logger";
import { IHttpResponse, statusResponse } from "../common/response.interface";

class AuthController {
  async register(req: express.Request, res: express.Response) {
    let response: IHttpResponse;
    try {
      await authService.register(req.body);
      response = {
        message: statusResponse.Success,
        code: 201,
        error: "",
        data: null,
      };
      res.status(response.code).json(response);
    } catch (error) {
      logger.error(String(error));
      response = {
        message: statusResponse.InternalServerError,
        code: 500,
        error: error instanceof Error ? error.message : "fail to register",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }

  async login(req: express.Request, res: express.Response) {
    let response: IHttpResponse;
    try {
      const tokens = await authService.login(req.body);
      response = {
        message: statusResponse.Success,
        code: 200,
        error: "",
        data: {
          access_token: tokens.token,
          expired_at: tokens.tokenExpirationInSeconds,
          refresh_token: tokens.refreshToken,
        },
      };
      res.status(response.code).json(response);
    } catch (error) {
      logger.error(String(error));
      response = {
        message: statusResponse.InternalServerError,
        code: 500,
        error: error instanceof Error ? error.message : "fail to login",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }
}

export default new AuthController();
