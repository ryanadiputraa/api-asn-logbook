import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./auth.controller";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route("/auth/v1/register").post(authController.register);
    this.app.route("/auth/v1/login").post(authController.login);

    return this.app;
  }
}
