import express from "express";
import { logger } from "../common/logger";
import { IHttpResponse, statusResponse } from "../common/response.interface";

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
}

export default new AuthMiddleware();
