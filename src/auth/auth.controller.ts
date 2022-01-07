import express from "express";

import authService from "./auth.service";
import { logger } from "../common/logger";
import { IHttpResponse, statusResponse } from "../common/response.interface";
import { IAccessTokenDTO, ILoginDTO } from "./auth.dto";

class AuthController {
  async register(req: express.Request, res: express.Response) {
    let response: IHttpResponse<null>;
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
    let response: IHttpResponse<IAccessTokenDTO>;
    try {
      const tokens = await authService.login(req.body);
      response = {
        message: statusResponse.Success,
        code: 200,
        error: "",
        data: {
          access_token: tokens.access_token,
          expired_at: tokens.expired_at,
          refresh_token: tokens.refresh_token,
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

  refresh(req: express.Request, res: express.Response) {
    let response: IHttpResponse<IAccessTokenDTO>;
    const tokens = authService.generateToken(res.locals.jwt?.userId);

    response = {
      message: statusResponse.Success,
      code: 200,
      error: "",
      data: {
        access_token: tokens.access_token,
        expired_at: tokens.expired_at,
        refresh_token: tokens.refresh_token,
      },
    };
    res.status(response.code).json(response);
  }
}

export default new AuthController();
