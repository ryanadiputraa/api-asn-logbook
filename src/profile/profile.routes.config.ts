import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";

export class ProfileRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProfileRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/v1/api/profile")
      .get((_: express.Request, res: express.Response) => {
        res.status(200).send({ message: "user details" });
      });

    return this.app;
  }
}
