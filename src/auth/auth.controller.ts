import express from "express";

import AuthService from "./auth.service";

class AuthController {
  async register(req: express.Request, res: express.Response) {
    const id = await AuthService.register(req.body);
    res.status(201).send({ id: id });
  }
}

export default new AuthController();
