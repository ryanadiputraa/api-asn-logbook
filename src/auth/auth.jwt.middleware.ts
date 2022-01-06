import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { Jwt } from "../common/jwt.types";
import { IHttpResponse, statusResponse } from "../common/response.interface";
import { logger } from "../common/logger";

const jwtSecret = String(process.env.JWT_SECRET);

class AuthJwtMiddleware {
  validateJWT(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let response: IHttpResponse;
    if (req.headers["authorization"]) {
      try {
        const authorization = req.headers["authorization"].split(" ");
        if (authorization[0] !== "Bearer") {
          logger.error("jwt middleware: invalid authorization header");
          response = {
            message: statusResponse.Unauthorized,
            code: 403,
            error: "invalid authorization header",
            data: null,
          };
          return res.status(response.code).json(response);
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
          next();
        }
      } catch (error) {
        logger.error("jwt middleware: can't parse Bearer token header");
        response = {
          message: statusResponse.Unauthorized,
          code: 403,
          error: "can't parse Bearer token header",
          data: null,
        };
        return res.status(response.code).json(response);
      }
    } else {
      logger.error("jwt middleware: missing authorization header");
      response = {
        message: statusResponse.Unauthorized,
        code: 401,
        error: "missing authorization header",
        data: null,
      };
      return res.status(response.code).json(response);
    }
  }

  validateRefresh(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let response: IHttpResponse;
    if (req.body && req.body.refresh_token) {
      const salt = crypto.createSecretKey(
        Buffer.from(res.locals.jwt?.refreshKey?.data)
      );
      const hash = crypto
        .createHmac("sha5", salt)
        .update(res.locals.jwt?.userId + jwtSecret)
        .digest("base64");

      if (hash === req.body.refresh_token) {
        return next();
      } else {
        logger.error("jwt middleware: invalid refresh token");
        response = {
          message: statusResponse.BadRequest,
          code: 401,
          error: "invalid refresh token",
          data: null,
        };
        res.status(response.code).json(response);
      }
    } else {
      logger.error("jwt middleware: missing refresh_token field");
      response = {
        message: statusResponse.BadRequest,
        code: 400,
        error: "missing refresh_token field",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }

  // validateJWT(req: express.Request, res: express.Response, next: express.NextFunction) {

  // }
}

export default new AuthJwtMiddleware();
