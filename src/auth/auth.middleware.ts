import express from "express";
import * as bcrypt from "bcrypt";

import { IHttpResponse, statusResponse } from "../common/response.interface";
import { logger } from "../common/logger";
import usersDao from "../users/users.dao";

class AuthMiddleware {
  async validateRegisterPayload(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let response: IHttpResponse<null>;
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
      response = {
        message: statusResponse.BadRequest,
        code: 400,
        error: "auth middleware: missing required field",
        data: null,
      };
      res.status(400).json(response);
    } else {
      const user = await usersDao.getUserLoginInfo(req.body.nip);
      if (user) {
        response = {
          message: statusResponse.BadRequest,
          code: 400,
          error: "nip was already used",
          data: null,
        };
        return res.status(response.code).json(response);
      }
      next();
    }
  }

  async validateUserInfo(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let response: IHttpResponse<null>;
    try {
      const user = await usersDao.getUserLoginInfo(req.body.nip);
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
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
