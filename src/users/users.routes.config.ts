import express from "express";
import authJwtMiddleware from "../auth/auth.jwt.middleware";

import { CommonRoutesConfig } from "../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/api/v1/profile")
      .all(authJwtMiddleware.validateJWT)
      .get((_: express.Request, res: express.Response) => {
        res.status(200).send({ message: res.locals.jwt });
      });

    return this.app;
  }
}
