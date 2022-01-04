import express from "express";
import * as argon2 from "argon2";

import authDao from "./auth.dao";
import { IHttpResponse, statusResponse } from "../common/response.interface";
import { logger } from "../common/logger";

class AuthMiddleware {
  validateRegisterPayload(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const p = req.body;
    if (
      !p.hasOwnProperty("fullname") ||
      !p.hasOwnProperty("nip") ||
      !p.hasOwnProperty("position") ||
      !p.hasOwnProperty("supervisor") ||
      !p.hasOwnProperty("supervisor_position") ||
      !p.hasOwnProperty("city") ||
      !p.hasOwnProperty("password")
    ) {
      logger.error("auth middleware: missing required field");
      const response: IHttpResponse = {
        message: statusResponse.BadRequest,
        code: 400,
        error: "auth middleware: missing required field",
        data: null,
      };
      res.status(400).json(response);
    } else {
      next();
    }
  }

  async validateUserInfo(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let response: IHttpResponse;
    try {
      const user = await authDao.getUserLoginInfo(req.body.nip);
      if (user) {
        if (await argon2.verify(user.password, req.body.password)) {
          // _id will be used for jwt claims
          req.body = {
            _id: user._id,
            ...req.body,
          };
          return next();
        }
      }
      response = {
        message: statusResponse.BadRequest,
        code: 400,
        error: "auth middleware: nip and password didn't match",
        data: null,
      };
      res.status(response.code).json(response);
    } catch (error) {
      response = {
        message: statusResponse.BadRequest,
        code: 400,
        error: "auth middleware: missing required field",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }
}

export default new AuthMiddleware();
