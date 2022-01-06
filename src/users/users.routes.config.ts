import express from "express";
import authJwtMiddleware from "../auth/auth.jwt.middleware";

import { CommonRoutesConfig } from "../common/common.routes.config";
import usersController from "./users.controller";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/api/v1/profile")
      .all(authJwtMiddleware.validateJWT)
      .get(usersController.getUserProfile);

    return this.app;
  }
}
