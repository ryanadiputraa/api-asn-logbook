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
        message: statusResponse.BadRequest,
        code: 400,
        error: error instanceof Error ? error.message : "fail to register",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }

  async login(req: express.Request, res: express.Response) {
    let response: IHttpResponse;

    try {
      const user = await authService.login(req.body);
      response = {
        message: !user ? statusResponse.BadRequest : statusResponse.Success,
        code: !user ? 404 : 200,
        error: !user ? "no user found" : "",
        data: user,
      };
      res.status(response.code).json(response);
    } catch (error) {
      logger.error(String(error));
      response = {
        message: statusResponse.BadRequest,
        code: 400,
        error: error instanceof Error ? error.message : "fail to login",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }
}

export default new AuthController();
