import express from "express";

import { logger } from "../common/logger";
import { IHttpResponse, statusResponse } from "../common/response.interface";
import { IProfileDTO } from "./users.dto";
import usersService from "./users.service";

class UsersController {
  async getUserProfile(req: express.Request, res: express.Response) {
    let response: IHttpResponse<IProfileDTO>;
    try {
      const userProfile = await usersService.getUserProfile(
        res.locals.jwt?.userId
      );
      response = {
        message: statusResponse.Success,
        code: 200,
        error: "",
        data: {
          fullname: userProfile.fullname,
          nip: userProfile.nip,
          position: userProfile.position,
          supervisor: userProfile.supervisor,
          supervisor_position: userProfile.supervisor_position,
          city: userProfile.city,
        },
      };
      res.status(200).json(response);
    } catch (error) {
      logger.error(String(error));
      response = {
        message: statusResponse.InternalServerError,
        code: 500,
        error:
          error instanceof Error
            ? error.message
            : "fail to retrieve user information",
        data: null,
      };
      res.status(response.code).json(response);
    }
  }
}

export default new UsersController();
