import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import AuthController from "./auth.controller";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.route("/v1/auth/register").post(AuthController.register);

    return this.app;
  }
}
