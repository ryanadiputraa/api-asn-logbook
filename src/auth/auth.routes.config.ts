import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./auth.controller";
import authJwtMiddleware from "./auth.jwt.middleware";
import authMiddleware from "./auth.middleware";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/auth/v1/register")
      .all(authMiddleware.validateRegisterPayload)
      .post(authController.register);

    this.app
      .route("/auth/v1/login")
      .all(authMiddleware.validateUserInfo)
      .post(authController.login);

    this.app
      .route("/auth/v1/refresh")
      .all(authJwtMiddleware.validateRefresh)
      .post(authController.refresh);

    return this.app;
  }
}
