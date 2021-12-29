import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/v1/api/users/details")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send({ message: "user details" });
      });

    return this.app;
  }
}
